from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Data model for testing
class Transaction(BaseModel):
    description: str
    amount: float

@app.get("/")
def read_root():
    return {"message": "SmartFinance API is running!"}

@app.post("/categorize/")
def categorize_transaction(transaction: Transaction):
    # Placeholder for AI logic later
    return {"category": "Business", "confidence": 0.95}