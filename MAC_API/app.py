from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Ticket
from models import AccountDeposit
from models import PaymentAccount
from models import Client

@app.route("/")
def hello():
    return "Hello World!"