from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os
import sqlite3

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
    try:
        # Create a temporary file to execute code safely
        with open('temp_code.py', 'w') as f:
            f.write(code)
        result = subprocess.run(['python', 'temp_code.py'], capture_output=True, text=True, timeout=5)
        os.remove('temp_code.py')
        if result.returncode != 0:
            raise ValueError("Code execution returned non-zero return code")
        return result.stdout
    except Exception as e:
        raise ValueError("Error executing code...")

@app.post("/test-code")
async def test_code(payload: dict):
    code = payload.get("code")
    if code is None:
        # return {"error": "Field 'code' is required."}
        raise ValueError("Code is required to test")
    try:
        output = execute_code(code)
        return output
    except Exception as e:
        raise ValueError("Code execution returned non-zero return code")


@app.post("/submit-code")
async def submit_code(payload: dict):
    code = payload.get("code")
    if code is None:
         # return {"error": "Field 'code' is required."}
        raise ValueError("Code is required to test")
    try:
        output = execute_code(code)
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        # Use parameterized queries to prevent SQL injection (malicious code)
        cursor.execute("INSERT INTO submissions (code, output) VALUES (?, ?)", (code, output))
        conn.commit()
        conn.close()
        return output
    except Exception as e:
        raise ValueError("Code execution returned non-zero return code")