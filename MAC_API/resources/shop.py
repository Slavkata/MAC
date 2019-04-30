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
        
        if Shop.find_by_name(data['name']) is not None:
            return {'message':'name of shop already in use'},400
        else:      
            shop = Shop(**data)
            try:
                shop.save_to_db()
                return {'message': 'success shop register '},201
            except:
                return {'message': 'failed  shop register '},500
        


class ShopListResource(Resource):
    def get(self):     
        try:
            return {'campings':[shop.serialize() for shop in Shop.query.all()]},200
        except:  
            return {'message':'cant get shop'},404
