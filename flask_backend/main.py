from flask import Flask
from flask_cors import CORS

from flask_backend import config
from flask_backend.auth import auth

app = Flask(__name__)

CORS(app)

app.config.from_object(config.DevConfig)

app.register_blueprint(auth)

def launch_app():
	app.run(host="0.0.0.0",port=9999)

if __name__ == "__main__":
	launch_app()