import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import DarkModeToggle from './components/DarkModeToggle';
import './styles/App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSend = (text) => {
    const newMessage = { sender: 'user', text };
    setMessages([...messages, newMessage]);
    // 여기에 백엔드 API 호출 후 봇 응답을 추가하는 로직 추가
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className="app">
      <DarkModeToggle toggleDarkMode={toggleDarkMode} />
      <ChatWindow messages={messages} />
      <InputForm onSend={handleSend} />
    </div>
  );
};

export default App;
