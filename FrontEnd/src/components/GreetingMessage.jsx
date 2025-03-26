import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';

const GreetingMessage = () => {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div
    style={{
      textAlign: 'center',
      fontSize: '3rem',
      marginTop: '9rem'
    }}
    > 
      <ReactTyped
        strings={['Hi, How Can I Help You?']}
        typeSpeed={40}
        backSpeed={0}
        showCursor={false}
        onComplete={() => setShowIcon(true)} // ✅ 텍스트 끝난 후에 아이콘 보이게
      />
      {showIcon && <i className="fa-solid fa-utensils" style={{ marginLeft: '10px'}}/>}
    </div>
  );
};

export default GreetingMessage;