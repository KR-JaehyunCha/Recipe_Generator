// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import DarkModeToggle from './components/DarkModeToggle';
import SideBar from './components/SideBar';
import './styles/App.css'; // 전역 스타일 (선택)

// axios 설치: npm install axios
import axios from 'axios';

function App() {
  // 메시지 상태
  const [messages, setMessages] = useState([]);
  // 다크 모드 상태
  const [darkMode, setDarkMode] = useState(false);

  // 메시지 전송 함수
  const handleSend = async (text) => {
    // 사용자 메시지 추가
    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Flask 서버에 POST 요청 (예: http://localhost:5000/api/echo)
      const response = await axios.post('http://localhost:5000/api/echo', {
        text: text,
      });

      // 서버 응답에서 봇 메시지 추출
      // 백엔드 echo 예시: { "received": { "text": "..."} }
      const botReply = response.data.received.text;

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className="app">
      {/* 왼쪽 사이드바 */}
      <SideBar />

      {/* 오른쪽 메인 컨테이너 (채팅창 + 입력영역) */}
      <div className="main-container">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* 채팅창 */}
        <div className="chat-window">
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