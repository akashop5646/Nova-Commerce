from fastapi import FastAPI

app = FastAPI(
    title="Klin API Gateway",
    description="Enterprise API Gateway routing layout modifications, customizers, and store data streams.",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Klin API Gateway is online"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
