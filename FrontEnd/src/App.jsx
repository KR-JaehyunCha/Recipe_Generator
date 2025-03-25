// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import DarkModeToggle from './components/DarkModeToggle';
import SideBar from './components/SideBar';
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

    // 임시 봇 응답
    setMessages((prev) => [...prev, { sender: 'bot', text: '안녕하세요!' }]);
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
        {/* 다크 모드 토글을 상단에 두고 싶다면 여기 배치해도 됨 */}
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
