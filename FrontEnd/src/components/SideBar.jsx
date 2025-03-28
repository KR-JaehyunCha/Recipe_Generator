import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Sidebar.css';

const Sidebar = ({ onNewChat, onLoadSession, reloadSessions }) => {
  const [sessionList, setSessionList] = useState([]);

  const fetchSessions = async () => {
    const res = await axios.get("http://localhost:8000/api/chat-sessions");
    setSessionList(res.data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

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

  const handleClearAllSessions = async () => {
    const confirm = window.confirm("정말 모든 대화를 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await axios.delete("http://localhost:8000/api/chat-sessions");
      fetchSessions();   // 사이드바 목록 갱신
      onNewChat();       // 메인 채팅창 초기화
    } catch (error) {
      console.error("대화 삭제 실패:", error);
    }
  };
  
  return (
    <div className="sidebar">
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

      <div className="sidebar-bottom-buttons">
        
        <button className="clear-conversation" onClick={handleClearAllSessions}>
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
