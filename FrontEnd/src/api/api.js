import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Flask 서버 주소

export async function getTestData() {
  // Flask 서버의 /api/test 엔드포인트 호출
  const response = await axios.get(`${BASE_URL}/api/test`);
  return response.data; // { message: "Hello from Flask API!" }
}