from pydantic import BaseModel, Field
from datetime import datetime
from fastapi import APIRouter
import uuid

class Evidence(BaseModel):
    evidence_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    report_id: str = Field(min_length=1)
    file_url: str = Field(min_length=1)
    file_type: str = Field(min_length=1)
    uploaded_at: datetime = Field(default_factory=datetime.now)

router = APIRouter()

@router.post("/evidence")
def send_evidence(evidence: Evidence):
    return {
        "evidence": evidence
    }