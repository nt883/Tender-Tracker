from fastapi import FastAPI
from routes.reports import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Tender Tracker API is running"}
