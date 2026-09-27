from pydantic import BaseModel, Field
from datetime import datetime
from fastapi import APIRouter

class Report(BaseModel):
    project_id: str = Field(min_length=1)
    user_id: str = Field(min_length=1)
    description: str = Field(min_length=1)
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.now)

router = APIRouter()

@router.post("/reports")
def send_report(report: Report):
    return {
        "report": report
    }