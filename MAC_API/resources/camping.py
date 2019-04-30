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

    parser.add_argument('longitude',
                        type=float,
                        required=True,
                        help="please enter location"
                        )

    parser.add_argument('latitude',
                        type=float,
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
        if CampingSpot.find_by_name(data['name']) is not None:
            return {'message':'name already in use'},400
        else:
            camping = CampingSpot(data.name, data.latitude, data.longitude, data.capacity, data.price)
            try:
                camping.save_to_db()
                return {'message': 'success CampingSpot register '},201
            except:
                return {'message': 'failed  CampingSpot register '},500
        
        



class CampingListResource(Resource):
    def get(self):     
        try:
            return {'campings':[camping.serialize() for camping in CampingSpot.query.all()]},200
        except:
          
            return {'message':'error'},404
