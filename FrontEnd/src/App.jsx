// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import DarkModeToggle from './components/DarkModeToggle';
import './styles/App.css'; // 전역 스타일 (선택)

function App() {
  // 메시지 상태
  const [messages, setMessages] = useState([]);
  // 다크 모드 상태
  const [darkMode, setDarkMode] = useState(false);

  // 메시지 전송 함수
  const handleSend = (text) => {
    const newMessage = { sender: 'user', text };
    setMessages([...messages, newMessage]);

    // TODO: 여기에 백엔드 API 호출, 봇 응답 추가 등
    // 임시 예시:
    setMessages((prev) => [...prev, { sender: 'bot', text: '안녕하세요!'}]);
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
      {/* 다크 모드 토글 */}
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
  );
}

export default App;

