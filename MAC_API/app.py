from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from  flask_jwt import JWT
from resources.ticket import TicketResource
from resources.user import UserResource
from security.security import authenticate,identity

import  os


app = Flask(__name__)
api = Api(app)

app.secret_key = 'blablaabla'

jwt = JWT(app,authenticate,identity)


#app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mac.db'


@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(TicketResource,'/ticket/<string:ticket_number>')
api.add_resource(UserResource,'/user/register')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000,debug=True)