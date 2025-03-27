// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import SideBar from './components/SideBar';
import GreetingMessage from './components/GreetingMessage';
import './styles/App.css'; // 전역 스타일 (선택)

// axios 설치: npm install axios
import axios from 'axios';

function App() {
  // 메시지 상태
  const [messages, setMessages] = useState([]);
  const [showGreeting, setShowGreeting] = useState(true);

  // 메시지 전송 함수
  const handleSend = async (text) => {
    
    setShowGreeting(false);

    // 사용자 메시지 추가
    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // FastAPI 서버에 POST 요청 (예: http://localhost:8000/api/echo)
      // FastAPI에서 return {"received": data.text} 라고 하면,
      // response.data.received 값이 실제 봇 응답이 됩니다.
      const response = await axios.post('http://localhost:8000/api/echo', {
        text: text,
      });

      // 서버 응답에서 봇 메시지 추출
      // 예: { "received": "사용자 입력" }
      const botReply = response.data.received; 
      // FastAPI 코드에 따라 구조가 다를 수 있으니 확인하세요.

      // 봇 메시지 추가
      const botMessage = { sender: 'bot', text: botReply };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('API 호출 에러:', error);

      // 오류 발생 시 임시 메시지
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '서버와 통신 중 오류가 발생했습니다.' },
      ]);
    }
  };

  // New Chat 기능 추가
  const handleNewChat = () => {
    setMessages([]);
    setShowGreeting(true);
  };

  return (
    <div className="app">
      {/* 왼쪽 사이드바 */}
      <SideBar onNewChat={handleNewChat} />

      {/* 오른쪽 메인 컨테이너 (채팅창 + 입력영역) */}
      <div className="main-container">

        {/* 채팅창 */}
        <div className="chat-window">
          {showGreeting && <GreetingMessage />}
          <ChatWindow messages={messages} />
        </div>

        {/* 입력창 */}
        <div className="input-area">
          <InputForm onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;