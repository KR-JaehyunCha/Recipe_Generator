import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
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
