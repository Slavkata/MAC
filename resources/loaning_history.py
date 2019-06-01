from flask_restful import Resource, reqparse
from flask import jsonify
from models.loan_history import LoanHistory

class LoanHistoryResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('ticket_number', type=int, required=True, location='args')
        ticket_number = self.parser.parse_args().ticket_number

        loaning = LoanHistory.get_ticket_number(ticket_number)

        if loaning is None:
            return {'message': 'no loan history'}, 201

        return jsonify(loaning)
