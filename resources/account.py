from flask_restful import Resource, reqparse
from flask import jsonify
from models.account import PaymentAccount


class AccountResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('ticket_number', type=int, location='args')
        data = self.parser.parse_args()

        account = PaymentAccount.find_by_ticket_number(data.ticket_number)
        return jsonify(account.serialize())

