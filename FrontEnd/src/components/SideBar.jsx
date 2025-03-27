import React from 'react';
import '../styles/Sidebar.css';

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

const Sidebar = ({ onNewChat }) => {
  return (
    <div className="sidebar">
      <button className="new-chat-button" onClick={onNewChat}>+ New Chat</button>
      
      <div className="chat-history-all">
        <div className="chat-history-title">Chat History</div>
        <div className="chat-history-list"></div>
      </div>
      
      {/* 여기에 필요한 버튼/메뉴 항목 추가 */}
      <button className="clear-conversation">
        Clear Conversation
        <i class="fa-regular fa-trash-can" style={{marginLeft: "8px"}}></i>
      </button>

      <button className="darkmode-on-off" onClick={toggleDarkMode}>
        Dark Mode
        <i class="fa-regular fa-lightbulb" style={{marginLeft: "8px"}}></i>
      </button>

      <button className="updates-FAQ">
        Updates / FAQ
        <i class="fa-regular fa-pen-to-square" style={{marginLeft: "8px"}}></i>
      </button>
    </div>
  );
};

export default Sidebar;