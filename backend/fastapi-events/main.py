import os
from dotenv import load_dotenv
import subprocess
import requests
import uuid
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Optional
# Opcional: para colas
# import aio_pika
# import redis

load_dotenv()

NVD_API_KEY = os.getenv("NVD_API_KEY")
SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")

app = FastAPI()

# Simulación de almacenamiento en memoria para escaneos
scans: Dict[str, dict] = {}

class ScanRequest(BaseModel):
    target_ip: str
    scan_type: str = "basic"

@app.post("/api/scan/")
def create_scan(request: ScanRequest):
    scan_id = str(uuid.uuid4())
    scans[scan_id] = {
        "target_ip": request.target_ip,
        "scan_type": request.scan_type,
        "status": "pending",
        "result": None
    }
    # Aquí se publicaría el evento a RabbitMQ/Redis en una implementación real
    # Por ahora, ejecutamos el escaneo directamente (sincronamente)
    try:
        result = run_scan(request.target_ip)
        scans[scan_id]["result"] = result
        scans[scan_id]["status"] = "done"
    except Exception as e:
        scans[scan_id]["status"] = "error"
        scans[scan_id]["result"] = str(e)
    return {"scan_id": scan_id, "status": scans[scan_id]["status"]}

@app.get("/api/scan/{scan_id}/status/")
def get_scan_status(scan_id: str):
    scan = scans.get(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return {"scan_id": scan_id, "status": scan["status"]}

@app.get("/api/scan/{scan_id}/result/")
def get_scan_result(scan_id: str):
    scan = scans.get(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return {"scan_id": scan_id, "result": scan["result"]}

# --- Funciones auxiliares ---
def run_scan(ip: str) -> dict:
    # Ejecutar Nmap
    nmap_result = run_nmap(ip)
    # Consultar Shodan
    shodan_result = query_shodan(ip)
    # Consultar NVD (ejemplo: buscar CVEs por IP, aunque normalmente es por software)
    nvd_result = query_nvd()
    # Unir resultados
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
    # Ejemplo: buscar CVEs recientes (ajustar según necesidad)
    url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?apiKey={NVD_API_KEY}&resultsPerPage=3"
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            return resp.json()
        else:
            return {"error": resp.text}
    except Exception as e:
        return {"error": str(e)} 