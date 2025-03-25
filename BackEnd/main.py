# main.py
from fastapi import FastAPI
from pydantic import BaseModel

# CORS 설정을 위한 추가 import
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정
# React (http://localhost:3000)에서 오는 요청 허용
origins = [
    "http://localhost:3000",
    # 필요한 도메인/포트가 있다면 추가
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],     # GET, POST, PUT, DELETE 등
    allow_headers=["*"],     # 모든 헤더 허용
)

# 예시 모델
class EchoRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/test")
def test_endpoint():
    return {"message": "FastAPI is connected!"}

@app.post("/api/echo")
def echo_endpoint(data: EchoRequest):
    # 클라이언트에서 받은 text를 그대로 돌려줌
    return {"received": data.text}
