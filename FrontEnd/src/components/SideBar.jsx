import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <button className="new-chat-button">New Chat</button>
      <button className="chat-history-button">Chat History</button>
      {/* 여기에 필요한 버튼/메뉴 항목 추가 */}
    </div>
  );
};

export default Sidebar;