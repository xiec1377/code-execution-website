from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.post("/test-code")
async def test_code(payload: dict):
    code = payload.get("code")
    if code is None:
        return {"error": "Field 'code' is required."}
    return {"message": "Test code received successfully"}


@app.post("/submit-code")
async def test_code(payload: dict):
    code = payload.get("code")
    if code is None:
        return {"error": "Field 'code' is required."}
    return {"message": "Submission code received successfully"}