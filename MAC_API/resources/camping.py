from flask_restful import Resource,reqparse
from models.camping import CampingSpot
from db import db
from flask import jsonify


class CampingResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="please enter name"
                        )

    parser.add_argument('location',
                        type=str,
                        required=True,
                        help="please enter location"
                        )

    parser.add_argument('capacity',
                        type=int,
                        required=True,
                        help="please enter capacity"
                        )

    parser.add_argument('price',
                        type=float,
                        required=True,
                        help="please enter price"
                        )
    def post(self):
        data = self.parser.parse_args()
        camping = CampingSpots(data.name, data.location, data.capacity, data.price)
        
        try:
            db.session.add(camping)
            db.session.commit()
            return {'message': 'success user register '},201
        except:
            return {'message': 'success error register '},500



class CampingResourceGet(Resource):
    def get(self):
        
        try:
            return {'campings':[camping.serialize() for camping in CampingSpots.query.all()]},200
        except:
          
            return {'message':'error'},404
