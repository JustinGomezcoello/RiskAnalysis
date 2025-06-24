import os
import asyncio
import aio_pika
import subprocess
import requests
from dotenv import load_dotenv

load_dotenv()

NVD_API_KEY = os.getenv("NVD_API_KEY")
SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")
RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672/")

# Simulación de almacenamiento compartido (en producción usar base de datos o cache)
scans = {}

def run_scan(ip: str) -> dict:
    # Ejecutar Nmap
    nmap_result = run_nmap(ip)
    # Consultar Shodan
    shodan_result = query_shodan(ip)
    # Consultar NVD
    nvd_result = query_nvd()
    return {
        "nmap": nmap_result,
        "shodan": shodan_result,
        "nvd": nvd_result
    }

def run_nmap(ip: str) -> dict:
    try:
        output = subprocess.check_output(["nmap", "-sV", ip], text=True, timeout=30)
        return {"raw": output}
    except Exception as e:
        return {"error": str(e)}

def query_shodan(ip: str) -> dict:
    if not SHODAN_API_KEY:
        return {"error": "No SHODAN_API_KEY set"}
    url = f"https://api.shodan.io/shodan/host/{ip}?key={SHODAN_API_KEY}"
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            return resp.json()
        else:
            return {"error": resp.text}
    except Exception as e:
        return {"error": str(e)}

def query_nvd() -> dict:
    if not NVD_API_KEY:
        return {"error": "No NVD_API_KEY set"}
    url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?apiKey={NVD_API_KEY}&resultsPerPage=3"
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            return resp.json()
        else:
            return {"error": resp.text}
    except Exception as e:
        return {"error": str(e)}

async def main():
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    queue_name = "scan_tasks"
    async with connection:
        channel = await connection.channel()
        queue = await channel.declare_queue(queue_name, durable=True)
        print(f"[Worker] Waiting for scan tasks in queue '{queue_name}'...")
        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    body = message.body.decode()
                    scan_id, target_ip, scan_type = body.split("|")
                    print(f"[Worker] Processing scan: {scan_id} for {target_ip}")
                    try:
                        result = run_scan(target_ip)
                        scans[scan_id] = {"status": "done", "result": result}
                        print(f"[Worker] Scan {scan_id} completed.")
                    except Exception as e:
                        scans[scan_id] = {"status": "error", "result": str(e)}
                        print(f"[Worker] Scan {scan_id} failed: {e}")

if __name__ == "__main__":
    asyncio.run(main()) 