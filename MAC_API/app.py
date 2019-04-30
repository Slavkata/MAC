
from	flask import Flask
from	flask_restful import Api
from	flask_jwt import JWT
from  flask_sqlalchemy import SQLAlchemy

from	security.security import authenticate,identity

from	resources.ticket import TicketResource
from	resources.user import UserResource


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from  flask_jwt import JWT
from resources.ticket import TicketResource
from resources.user import UserResource
from security.security import authenticate,identity
from resources.rating import RatingResource, RatingResourceGet
from resources.camping import CampingResource, CampingResourceGet

import  os


app = Flask(__name__)
api = Api(app)

app.secret_key = 'blablaabla'

jwt = JWT(app,authenticate,identity)


#app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mac.db'



api.add_resource(TicketResource,'/ticket')


api.add_resource(TicketResource,'/ticket/<string:ticket_number>')

api.add_resource(UserResource,'/user/register')

#adding the rating 
api.add_resource(RatingResource,'/rating/create')
api.add_resource(RatingResourceGet,'/ratings/get')

#adding camping 
api.add_resource(CampingResource,'/camping/create')
api.add_resource(CampingResourceGet,'/campings/get')




if __name__ == '__main__':
    from manage import  db
    db.init_app(app)
    app.run(port=5000,debug=True)
