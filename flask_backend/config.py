import os

class Config:
	SECRET_KEY = os.urandom(16)

class DevConfig(Config):
	FLASK_ENV = 'development'
	DEBUG = False
	TESTING = False