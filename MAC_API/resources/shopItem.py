from flask_restful import Resource,reqparse
from models.shopItem import Item
from db import db
from flask import jsonify



class ItemResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,              
                        )

    parser.add_argument('description',
                        type=str,
                        required=True,              
                        )


    parser.add_argument('quantity',
                        type=int,
                        required=True,              
                        )

    parser.add_argument('price',
                        type=float,
                        required=True,               
                        )
    def post(self):
        data = self.parser.parse_args()
        
        if Item.find_by_name(data['name']) is not None:
            return {'message':'name of shop already in use'},400
        else:      
            item = Item(**data)
            try:
                item.save_to_db()
                return {'message': 'success shop register '},201
            except:
                return {'message': 'failed  shop register '},500
        


class ItemListResource(Resource):
    def get(self):     
        try:
            return {'campings':[item.serialize() for item in Item.query.all()]},200
        except:  
            return {'message':'cant get shop'},404
