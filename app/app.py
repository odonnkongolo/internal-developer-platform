from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/health')
def health_check():
    return jsonify({
        "service": "Threat Intelligence API",
        "status": "Healthy",
        "version": "1.0",
        "environment": os.getenv("APP_ENV", "local-k3d")
    }), 200

if __name__ == '__main__':
    # Running on 8080 to avoid standard port 80 conflicts internally
    app.run(host='0.0.0.0', port=8080, debug=False)