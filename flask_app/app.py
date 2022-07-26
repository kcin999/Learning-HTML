from datetime import timedelta
from flask import Flask, abort
from backend.models import db, User
from flask_login import LoginManager, current_user
from backend.config import DevConfig
from flask_cors import CORS
from functools import wraps

def admin_required(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if current_user.admin:
			return f(*args, **kwargs)
		else:
			return abort(401, 'Must be an admin')
	return wrap

def create_app():
	login_manager = LoginManager()

	app = Flask(__name__)

	CORS(app, supports_credentials=True)

	app.config.from_object(DevConfig)

	db.init_app(app)

	login_manager.init_app(app)

	@login_manager.user_loader
	def load_user(user_id):
		return User.query.get(user_id)

	from backend.Blueprints.auth.auth import auth
	app.register_blueprint(auth)

	from backend.Blueprints.robinhood.robinhood import robinhood
	app.register_blueprint(robinhood)

	with app.app_context():
		db.create_all()

app.run(port=8000)