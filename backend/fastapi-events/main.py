from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import uuid

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
    return {"scan_id": scan_id, "status": "pending"}

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