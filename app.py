from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from Email.email_service import mail
from cors_resources import cors_resources
from models.db_init import db
from resources.account import AccountResource
from resources.camping import CampingResource, CampingSpotResource
from resources.loan_item import LoanItemsResource
from resources.reviews import ReviewsResource
from resources.shop import ShopResource
from resources.shop_items import ShopItemsResource
from resources.ticket import TicketResource
from resources.topup import TopupResource

app = Flask(__name__)
api = Api(app)
cors = CORS(app, methods=['POST', 'OPTIONS'], resources=cors_resources)

app.secret_key = 'blablaabla'

#app.config.from_object(os.environ['APP_SETTINGS'])
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
# app.config['MAIL_USE_TLS'] = True
# this email address does not yet exist
app.config['MAIL_USERNAME'] = 'mcheesecars@gmail.com'
app.config['MAIL_PASSWORD'] = r'mac&cheese'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgres://rhdlffpmcetzoc:29a798c1c1c09f69ce5ec050b9e9e2df40e7376e62b7586c4634773a2accd485@ec2-54-247-70-127.eu-west-1.compute.amazonaws.com:5432/d15pb8k7eqa69t'

api.add_resource(TicketResource, '/ticket/')

#topup resources
api.add_resource(TopupResource, '/account/topup/')

#adding camping
api.add_resource(CampingResource, '/camping/')
api.add_resource(CampingSpotResource, '/camping/create/')

api.add_resource(ReviewsResource, '/review/')

api.add_resource(ShopResource, '/shop/')
api.add_resource(ShopItemsResource, '/shop-item/')

api.add_resource(AccountResource, '/account/')

api.add_resource(LoanItemsResource, '/loan/')

db.init_app(app)
mail.init_app(app)
