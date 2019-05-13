from flask_restful import Resource, reqparse

from models.account import PaymentAccount
from models.deposit import AccountDeposit


class TopupResource(Resource):
    parser =  reqparse.RequestParser()
    parser.add_argument('ticket_number', type=str, required=True, help="ticket_number can't be left blank")
    parser.add_argument('amount', type=float, required=True, help="float can't be left blank")

    def post(self):
        data = self.parser.parse_args()
        account  = PaymentAccount.find_by_ticket_number(data.ticket_number)
        if  account:
             deposit = AccountDeposit(data.ticket_number,data.amount)
             deposit.save_to_db()
             account.balance += data.amount
             account.save_to_db()
             return {'message': 'success topup'}, 200
        else:
            return {'message':'payment account not found'},404
