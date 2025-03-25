from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# CORS 설정: 다른 도메인(예: http://localhost:3000)에서 오는 요청 허용
CORS(app)

# 루트 라우트 (GET)
@app.route('/')
def home():
    return "Hello from Flask!"

# 간단 테스트 라우트 (GET)
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is connected!"})

# POST 요청 테스트용 라우트 (예: echo)
@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.json  # 클라이언트에서 보낸 JSON 데이터를 받음
    return jsonify({"received": data})

if __name__ == '__main__':
    # 디버그 모드로 서버 실행 (개발 중에만 사용)
    app.run(debug=True)