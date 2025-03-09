import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // 필요한 경우 스타일 로드

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);