from flask import Flask
from flask_restful import Api

from models.db_init import db
from resources.camping import CampingResource, CampingSpotResource

app = Flask(__name__)
api = Api(app)

app.secret_key = 'blablaabla'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'postgres://rhdlffpmcetzoc:29a798c1c1c09f69ce5ec050b9e9e2df40e7376e62b7586c4634773a2accd485@ec2-54-247-70-127.eu-west-1.compute.amazonaws.com:5432/d15pb8k7eqa69t'

#adding camping 
api.add_resource(CampingResource, '/camping')
api.add_resource(CampingSpotResource, '/camping/create')

db.init_app(app)
