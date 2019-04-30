from	flask import Flask
from	flask_restful import Api
from	flask_jwt import JWT
from  flask_sqlalchemy import SQLAlchemy

from	security.security import authenticate,identity

from	resources.ticket import TicketResource
from	resources.user import UserResource

import  os


app = Flask(__name__)
api = Api(app)

app.secret_key = 'blablaabla'

jwt = JWT(app,authenticate,identity)


#app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mac.db'


api.add_resource(TicketResource,'/ticket')
api.add_resource(UserResource,'/user/register')

if __name__ == '__main__':
    from manage import  db
    db.init_app(app)
    app.run(port=5000,debug=True)
