from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend origin
    allow_credentials=True,
    allow_methods=["POST"],  # Adjust the allowed methods as needed
    allow_headers=["Content-Type"],  # Adjust the allowed headers as needed
)


def execute_code(code: str):
    # return "OUTPUT"
    try:
        # Create a temporary file to execute code safely
        with open('temp_code.py', 'w') as f:
            f.write(code)
        result = subprocess.run(['python', 'temp_code.py'], capture_output=True, text=True, timeout=5)
        os.remove('temp_code.py')
        if result.returncode != 0:
            raise ValueError(f"Subprocess returned non-zero return code: {result.returncode}, Error: {result.stderr}")
        return result.stdout
    except Exception as e:
        raise ValueError(f"Error executing code: {str(e)}")

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.post("/test-code")
async def test_code(payload: dict):
    code = payload.get("code")
    if code is None:
        return {"error": "Field 'code' is required."}
    output = execute_code(code)
    return {"output": output}
    # return {"message": "Test code received successfully"}


@app.post("/submit-code")
async def test_code(payload: dict):
    code = payload.get("code")
    if code is None:
        return {"error": "Field 'code' is required."}
    return {"message": "Submission code received successfully"}