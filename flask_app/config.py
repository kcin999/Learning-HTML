from datetime import timedelta
import os

class Config:
	SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')

class DevConfig(Config):
	FLASK_ENV = 'development'
	DEBUG = False
	TESTING = False
	SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
	SESSION_COOKIE_HTTPONLY = False
	PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)
