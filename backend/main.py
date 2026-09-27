from fastapi import FastAPI
from routes.reports import router as reports_router
from routes.evidence import router as evidence_router

app = FastAPI()

app.include_router(reports_router)
app.include_router(evidence_router)

@app.get("/")
def read_root():
    return {"message": "Tender Tracker API is running"}
