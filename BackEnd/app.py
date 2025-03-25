from flask import Flask, request, jsonify

app = Flask(__name__)

# 간단한 테스트 라우트
@app.route('/')
def home():
    return "Hello from Flask!"

# 예시 API 엔드포인트 (Echo 기능)
@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.json
    return jsonify({"received": data})

if __name__ == '__main__':
    app.run(debug=True)