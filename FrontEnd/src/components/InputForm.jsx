// src/components/InputForm.jsx
import React, { useState } from 'react';
import '../styles/InputForm.css';

const InputForm = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="input-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
};

export default InputForm;
