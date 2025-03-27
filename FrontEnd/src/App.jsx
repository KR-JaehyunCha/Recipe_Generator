// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import SideBar from './components/SideBar';
import GreetingMessage from './components/GreetingMessage';
import './styles/App.css';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [messages, setMessages] = useState([]);
  const [showGreeting, setShowGreeting] = useState(true);
  const [reloadSessions, setReloadSessions] = useState(false);

  const handleSend = async (text) => {
    setShowGreeting(false);

    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:8000/api/echo', {
        text: text,
      });

      const botReply = response.data.received;
      const botMessage = { sender: 'bot', text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API 호출 에러:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '서버와 통신 중 오류가 발생했습니다.' },
      ]);
    }
  };

  const handleNewChat = async () => {
    if (messages.length > 0) {
      await axios.post("http://localhost:8000/api/save-history", {
        session_id: uuidv4(),
        messages: messages
      });
    }

    setMessages([]);
    setShowGreeting(true);
    setReloadSessions(true); // 사이드바가 이걸 감지해서 목록 다시 불러옴
  };

  const handleLoadSession = (loadedMessages) => {
    setMessages(loadedMessages);
    setShowGreeting(false); // ✅ greeting 숨기기
  };

  return (
    <div className="app">
      {/* 왼쪽 사이드바 */}
      <SideBar
        onNewChat={handleNewChat}
        onLoadSession={handleLoadSession}
        reloadSessions={reloadSessions}
      />

      {/* 오른쪽 메인 컨테이너 */}
      <div className="main-container">
        <div className="chat-window">
          {showGreeting && <GreetingMessage />}
          <ChatWindow messages={messages} />
        </div>

        <div className="input-area">
          <InputForm onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;