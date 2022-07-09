from flask import Blueprint, render_template, request, abort
from backend.models import User, db
from flask_login import login_user, logout_user, login_required, current_user
from passlib.hash import sha256_crypt

auth = Blueprint('auth',__name__)

@auth.route('/')
def index():
	return render_template('welcome.html')

@auth.route("/login", methods=['POST'])
def login():
	username = request.form['username']
	password = request.form['password']

	print(username)
	print(password)
	
	user = db.session.query(User).filter_by(username=username).first()

	if not user or not sha256_crypt.verify(password, user.password):
		abort(401, "Invalid Login Crentials")

	login_user(user)

	return "", 200

@auth.route("/signup", methods=['POST'])
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

	return "", 201

@auth.route("/isAuthenticated", methods=['GET'])
def isAuthenticated():
	return str(current_user.is_authenticated)

@auth.route("/get_user_data", methods=['GET'])
@login_required
def get_user_data():
	return {
		"name": current_user.name,
		"username": current_user.username
	}

@auth.route("/logout")
@login_required
def logout():
	logout_user()
	return "Logout Successful", 200