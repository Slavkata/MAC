from flask_restful import Resource, reqparse
from flask import jsonify
from models.deposit import AccountDeposit
from models.spending_history import SpendingHistory

class DepositingHistoryResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('ticket_number', type=int, location='args')
        ticket_number = self.parser.parse_args().ticket_number

        if ticket_number is None:
            return {'total_balance': AccountDeposit.get_all_deposited_money() - SpendingHistory.get_all_spendings()}

        depositing = AccountDeposit.get_by_ticket_number(ticket_number)

        if len(depositing) is 0:
            return {'message': 'no deposits made'}, 201

        return jsonify(depositing)