from flask import jsonify
from flask_restful import Resource, reqparse
from models.camping import CampingSpots

class CampingResource(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('id', type=int, required=True, help='camping spot id cannot be blank')
        data = self.parser.parse_args()

        try:
            spot = CampingSpots.reserve(self, data.id)
            return spot.serialize()
        except:
            return {'message': 'error register '}, 500

    def get(self):
        try:
            return jsonify(CampingSpots.get_free_spots(self))
        except:
            return {"message": "error"}, 404


class CampingSpotResource(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('name', type=str, required=True, help='name cannot be blank')
        self.parser.add_argument('location', type=str, required=True, help='location cannot be blank')
        self.parser.add_argument('capacity', type=int, required=True, help='capacity cannot be blank')
        self.parser.add_argument('price', type=float, required=True, help='price cannot be blank')

        data = self.parser.parse_args()

        spot = CampingSpots(data.name, data.location, data.capacity, data.price)
        return jsonify(spot.create())
