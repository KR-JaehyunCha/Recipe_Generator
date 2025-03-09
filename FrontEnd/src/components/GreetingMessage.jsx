import React from 'react';
import { ReactTyped } from 'react-typed';

const GreetingMessage = () => {
  return (
    <div
    style={{
      textAlign: 'center',  // 텍스트 수평 중앙 정렬
      fontSize: '3rem',     // 글자 크기 (원하는 만큼 조정)
      marginTop: '3rem'     // 화면 위쪽에 여백
    }}
    > 
      <ReactTyped
        strings={['Hi, How Can I Help You?']}
        typeSpeed={40}
        backSpeed={0}
        showCursor={false}
      />
    </div>
  );
};

export default GreetingMessage;