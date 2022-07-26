import datetime
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(UserMixin, db.Model):
	__tablename__ = 'users'
	id = db.Column(
		db.Integer,
		primary_key=True
	)
	name = db.Column(
		db.String(100),
		nullable=False,
		unique=False
	)
	email = db.Column(
		db.String(40),
		unique=True,
		nullable=False
	)
	username = db.Column(
		db.String(40),
		unique=True,
		nullable=False
	)
	password = db.Column(
		db.String(200),
		primary_key=False,
		unique=False,
		nullable=False
	)
	created = db.Column(
		db.DateTime, 
		default=datetime.datetime.utcnow
	)

	admin = db.Column(
		db.Boolean,
		default=False
	)

	def __repr__(self):
		return f"id: {self.id}, name: {self.name}, email: {self.email}, username: {self.username}"