from flask_restful import Resource,reqparse
from models.shop import Shop
from db import db
from flask import jsonify
from models.user import User


class ShopResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        
                        )
    def post(self):
        data = self.parser.parse_args()
        print(data)
        
        
