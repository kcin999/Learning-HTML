from datetime import timedelta
import os

class Config:
	SECRET_KEY = "9OLWxND4o83j4K4iuopO"#os.urandom(16)

class DevConfig(Config):
	FLASK_ENV = 'development'
	DEBUG = False
	TESTING = False
	SQLALCHEMY_DATABASE_URI = "sqlite:///data.db"
	SESSION_COOKIE_HTTPONLY = False
	PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)
