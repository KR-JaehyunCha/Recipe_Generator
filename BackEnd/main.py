# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

import json, os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
CHAT_HISTORY_FILE = "chat_history.json"

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],     # GET, POST, PUT, DELETE
    allow_headers=["*"],
)

class Message(BaseModel):
    sender: str
    text: str

class ChatSession(BaseModel):
    session_id: str
    messages: List[Message]

@app.post("/api/save-history")
def save_chat_history(chat: ChatSession):
    history = []

    # 파일 있으면 기존 내용 불러옴
    if os.path.exists(CHAT_HISTORY_FILE):
        with open(CHAT_HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)

    # 새로운 세션 추가
    history.append(chat.dict())

    with open(CHAT_HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)

    return {"message": "Chat saved!"}

@app.get("/api/chat-sessions")
def get_chat_sessions():
    if os.path.exists(CHAT_HISTORY_FILE):
        with open(CHAT_HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
        # 세션 리스트만 반환 (title, session_id)
        return [{"session_id": h["session_id"], "title": h["messages"][0]["text"]} for h in history]
    return []

@app.get("/api/load-history")
def load_chat(session_id: str):
    if os.path.exists(CHAT_HISTORY_FILE):
        with open(CHAT_HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
        for h in history:
            if h["session_id"] == session_id:
                return h["messages"]
    return []

# 예시 모델
class EchoRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/test")
def test_endpoint():
    return {"message": "FastAPI is connected!"}

# Will be deleted
@app.post("/api/echo")
def echo_endpoint(data: EchoRequest):
    return {"received": data.text}

@app.delete("/api/chat-sessions")
def delete_all_sessions():
    with open("chat_history.json", "w") as f:
        json.dump([], f)
    return {"status": "all sessions cleared"}

# 요청 모델 정의 (입력값 받기)
class RecommendRequest(BaseModel):
    text: str

@app.post("/api/recommend")
def recommend_recipe(data: RecommendRequest):
    user_input = data.text.lower()

    dummy_recommendations = ["김치볶음밥", "계란말이", "된장찌개"]

    # 여기에서 모델 연동
    return {
        "input": user_input,
        "recipes": dummy_recommendations
    }