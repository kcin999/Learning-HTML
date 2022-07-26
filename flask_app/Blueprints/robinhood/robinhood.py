from flask import Blueprint, render_template, request, abort
from backend.models import User, db
from flask_login import login_required

robinhood = Blueprint('robinhood',__name__)
