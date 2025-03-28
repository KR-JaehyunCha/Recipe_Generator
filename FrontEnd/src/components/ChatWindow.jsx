import React from 'react';
import { ReactTyped } from 'react-typed';
import '../styles/ChatWindow.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
        >
          {msg.sender === 'bot' ? (
            /* 채팅 스타일 디자인 (채팅치는 것처럼 나온다) */
            <ReactTyped
              strings={[msg.text]}
              typeSpeed={30}
              showCursor={false}
            />
          ) : (
            msg.text
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
