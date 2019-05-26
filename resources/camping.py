from flask import jsonify
from flask_restful import Resource, reqparse

from Email import email_service
from models.camping import CampingSpots
from models.ticket import Ticket


class CampingResource(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('id', type=int, required=True, help='camping spot id cannot be blank')
        data = self.parser.parse_args()

        try:
            spot = CampingSpots.reserve(self, data.id)
            # change campin_spot on ticket
            return spot.serialize()
        except:
            return {'message': 'error register '}, 500

    def get(self):
        try:
            return jsonify(CampingSpots.get_free_spots(self))
        except:
            return {"message": "error"}, 404

    def put(self):
        # inviting people to camp spot of ticket_number
        self.parser.add_argument('id', type=int, required=True)
        self.parser.add_argument('ticket_number', type=int, required=True, action='append')
        data = self.parser.parse_args()

        spot = CampingSpots.get_by_id(data.id)

        for i in range(len(data.ticket_number)):
            temp_ticket = Ticket.find_by_ticket_number(data.ticket_number[i])
            temp_ticket.join_camping_spot(data.id)
            # email with invite
            email_service.camping_message(temp_ticket.email, camping_spot=spot.name)


class CampingSpotResource(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('name', type=str, required=True, help='name cannot be blank')
        self.parser.add_argument('region', type=str, required=True, help='location cannot be blank')
        self.parser.add_argument('number', type=int, required=True, help='capacity cannot be blank')
        self.parser.add_argument('price', type=float, required=True, help='price cannot be blank')

        data = self.parser.parse_args()

        spot = CampingSpots(data.name, data.region, data.number, data.price)
        return jsonify(spot.create())
