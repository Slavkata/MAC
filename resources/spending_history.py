from flask_restful import Resource, reqparse
from flask import jsonify
from models.spending_history import SpendingHistory

class SpendingHistoryResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('ticket_number', type=int, location='args')
        ticket_number = self.parser.parse_args().ticket_number

        if ticket_number is None:
            return {'total_spent': SpendingHistory.get_all_spendings()}

        spending = SpendingHistory.get_by_ticket_number(ticket_number)

        if spending is None:
            spending = SpendingHistory(ticket_number)
            spending.create()

        return jsonify(spending.serialize())