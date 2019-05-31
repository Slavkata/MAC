from flask_restful import Resource, reqparse
from models.ticket import Ticket
from models.camping import  CampingSpots
from flask import jsonify

class CampingCheckIn(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('ticket_number', type=int, required=True)
        ticket_number = self.parser.parse_args().ticket_number

        ticket = Ticket.find_by_ticket_number(ticket_number)

        if ticket is not None:
            if ticket.camping_spot is not None:
                return jsonify(CampingSpots.get_by_id(ticket.camping_spot).serialize())
            else:
                return {'campingSpot': False}, 404
        else:
            return {'message': 'no such ticket'}, 400
