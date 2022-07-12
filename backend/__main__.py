from datetime import timedelta
from flask import Flask, session
from backend.models import db, User
from flask_login import LoginManager
from backend.config import DevConfig
from flask_cors import CORS

login_manager = LoginManager()

app = Flask(__name__)

CORS(app, supports_credentials=True)

app.config.from_object(DevConfig)

db.init_app(app)

login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
	return User.query.get(user_id)

from backend.auth import auth
app.register_blueprint(auth)

with app.app_context():
	db.create_all()

app.run(port=8000)