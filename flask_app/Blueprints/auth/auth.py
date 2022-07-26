from flask import Blueprint, render_template, request, abort
from backend.models import User, db
from flask_login import login_user, logout_user, login_required, current_user
from passlib.hash import sha256_crypt
from backend.app import admin_required

auth = Blueprint('auth',__name__)

@auth.route('/')
def index():
	return render_template('welcome.html')

@auth.route("/login", methods=['POST'])
def login():
	username = request.form.get('username')
	password = request.form.get('password')

	user = db.session.query(User).filter_by(username=username).first()

	if not user or not sha256_crypt.verify(password, user.password):
		abort(401, "Invalid Login Crentials")

	login_user(user)

	return {
		'message': 'Successful Login'
	}

@auth.route("/register", methods=['POST'])
def signup():
	email = request.form.get('email')
	username = request.form.get('username')
	password = request.form.get('password')
	name = request.form.get('name')

	user = db.session.query(User).filter_by(username=username).first()

	if user:
		abort(409, 'Username already exists')
	
	user = db.session.query(User).filter_by(email=email).first()

	if user:
		abort(409, 'Email already exists')

	new_user = User(email=email, username=username, password=sha256_crypt.encrypt(password), name=name)

	db.session.add(new_user)
	db.session.commit()

	return {
		"message": "User Created"
	}

@auth.route("/is_authenticated", methods=['GET'])
def is_authenticated():
	return {
		'status': current_user.is_authenticated
	}

@auth.route("/is_admin", methods=['GET'])
def is_admin():
	return {
		'status': current_user.admin
	}

@auth.route("/get_user_data", methods=['GET'])
@login_required
def get_user_data():
	"""
	Gets the current user's information

	:return: User's name, username, and email
	:rtype: dict
	"""
	return {
		"name": current_user.name,
		"username": current_user.username,
		"email": current_user.email
	}

@auth.route("/logout")
@login_required
def logout():
	"""Logs Current user out"""
	logout_user()
	return {
		"status": "Logout Successful"
	}

@auth.route("/change_password")
@login_required
@admin_required
def change_password():
	"""
	Changes a user's permission. Must be logged in and have admin privileges.  
	"""