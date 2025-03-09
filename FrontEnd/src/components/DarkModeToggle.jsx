// src/components/DarkModeToggle.jsx
import React from 'react';
import '../styles/DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;