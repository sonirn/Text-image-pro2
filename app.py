from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()
app = Flask(__name__)
API_TOKEN = os.getenv("HF_API_TOKEN")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    text = request.json['text']
    API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
    headers = {"Authorization": f"Bearer {API_TOKEN}"}
    
    response = requests.post(API_URL, headers=headers, json={"inputs": text})
    if response.status_code == 200:
        return response.content
    else:
        return jsonify({"error": "Generation failed"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
