// src/api/api.js (React 예시)
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export async function echoMessage(text) {
  const response = await axios.post(`${API_URL}/api/echo`, { text });
  return response.data; // { received: "입력 텍스트" }
}
