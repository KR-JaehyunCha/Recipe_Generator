import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Sidebar.css';

const Sidebar = ({ onNewChat, onLoadSession, reloadSessions }) => {
  const [sessionList, setSessionList] = useState([]);

  const fetchSessions = async () => {
    const res = await axios.get("http://localhost:8000/api/chat-sessions");
    setSessionList(res.data); // [{ session_id, title }]
  };

  // 처음 1번 불러오기
  useEffect(() => {
    fetchSessions();
  }, []);

  // New Chat 이후 세션 갱신
  useEffect(() => {
    if (reloadSessions) {
      fetchSessions();
    }
  }, [reloadSessions]);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  const handleLoadSession = async (sessionId) => {
    const res = await axios.get("http://localhost:8000/api/load-history", {
      params: { session_id: sessionId }
    });
    onLoadSession(res.data);
  };

  return (
    <div className="sidebar">
      {/* 전체 사이드바를 위/아래로 나누기 */}
      <div className="sidebar-top">
        <button className="new-chat-button" onClick={onNewChat}>+ New Chat</button>

        <div className="chat-history-title">Chat History</div>
        <div className="chat-history-list">
          {sessionList.map((s) => (
            <button key={s.session_id} onClick={() => handleLoadSession(s.session_id)}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* 아래 고정 버튼 영역 */}
      <div className="sidebar-bottom-buttons">
        <button className="clear-conversation">
          Clear Conversation
          <i className="fa-regular fa-trash-can" style={{ marginLeft: "8px" }}></i>
        </button>

        <button className="darkmode-on-off" onClick={toggleDarkMode}>
          Dark Mode
          <i className="fa-regular fa-lightbulb" style={{ marginLeft: "8px" }}></i>
        </button>

        <button className="updates-FAQ">
          Updates / FAQ
          <i className="fa-regular fa-pen-to-square" style={{ marginLeft: "8px" }}></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;