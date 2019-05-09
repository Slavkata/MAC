from json import dumps

from flask import jsonify
from flask_restful import Resource, request

from models.camping import CampingSpots


class CampingResource(Resource):
    def post(self):
        data = request.get_json()['id']
        
        try:
            return {'message': 'success'}, 201
        except:
            return {'message': 'success error register '},500

    def get(self):
        try:
            return dumps(CampingSpots.get_free_spots(self)), 201
        except:
            return {"message": "error"}, 404


class CampingSpotResource(Resource):
    def post(self):
        data = request.get_json()
        spot = CampingSpots(data['name'], data['location'], data['capacity'], data['price'])
        return jsonify(spot.create())
