import os

class Config:
	SECRET_KEY = "9OLWxND4o83j4K4iuopO"#os.urandom(16)
	SQLALCHEMY_DATABASE_URI = "sqlite:///data.db"

class DevConfig(Config):
	FLASK_ENV = 'development'
	DEBUG = False
	TESTING = False