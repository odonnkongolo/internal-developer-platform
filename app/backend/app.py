from flask import Flask, jsonify, send_from_directory
import os

app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), '..', 'frontend'),
    static_url_path=''
)

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

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
