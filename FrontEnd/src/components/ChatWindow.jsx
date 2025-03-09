import React from 'react';
import GreetingMessage from './GreetingMessage';
import '../styles/ChatWindow.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {/* 채팅 시작 전 인사말 애니메이션 */}
      <GreetingMessage />

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
