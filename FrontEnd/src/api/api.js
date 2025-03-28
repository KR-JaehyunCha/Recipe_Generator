import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Testing 
export async function echoMessage(text) {
  const response = await axios.post(`${API_URL}/api/echo`, { text });
  return response.data; // { received: "입력 텍스트" }
}

// POST (Not connected to the model)
await axios.post('http://localhost:8000/api/recommend', {
  text: "계란, 양파 있어"
});


// Saving the chat-history
await axios.post("http://localhost:8000/api/save-history", {
  session_id: "abc123", // 고유한 값 (uuid 등 사용 가능)
  messages: [
    { sender: "user", text: "계란 있어" },
    { sender: "bot", text: "계란말이 추천드려요!" }
  ]
});

// Loading Chat History
useEffect(() => {
  axios.get("http://localhost:8000/api/chat-sessions").then((res) => {
    setSessionList(res.data); // ex: [{ session_id: "...", title: "..." }]
  });
}, []);