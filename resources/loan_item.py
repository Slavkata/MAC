from flask import jsonify
from flask_restful import Resource, reqparse

from models.account import PaymentAccount
from models.loan_item import LoanItem
from models.loan_history import LoanHistory


class LoanItemsResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('id', type=int, location='args')
        self.parser.add_argument('shop', type=int, location='args')
        self.parser.add_argument('category', type=str, location='args')
        data = self.parser.parse_args()

        if data.category is not None:
            return jsonify(LoanItem.find_by_category(data.category))
        elif data.id is not None:
            return jsonify(LoanItem.get_by_id(data.id).serialize())
        elif data.shop is not None:
            return jsonify(LoanItem.get_by_shop(data.shop))
        else:
            return jsonify(LoanItem.get_all())

    def post(self):
        self.parser.add_argument('name', type=str)
        self.parser.add_argument('category', type=str)
        self.parser.add_argument('price', type=float)
        self.parser.add_argument('shop', type=int)
        self.parser.add_argument('quantity', type=int)
        data = self.parser.parse_args()

        shop_item = LoanItem(data.name, data.category, data.price, data.shop, data.quantity)
        shop_item.create()
        return jsonify(shop_item.serialize())

    def put(self):
        # loan
        self.parser.add_argument('id', type=int, action='append')
        self.parser.add_argument('ticket_number', type=int)
        data = self.parser.parse_args()

        for i in range(len(data.id)):
            loan_item = LoanItem.get_by_id(data.id[i])
            client = PaymentAccount.find_by_ticket_number(data.ticket_number)
            client.deduce(loan_item.price)
            loan_record = LoanHistory(data.ticket_number, data.id[i])
            loan_record.loan_item(loan_item, data.ticket_number)

        return {"message" : "Just bring it back after"}, 200

    def delete(self):
        self.parser.add_argument('id', type=int, action='append')
        self.parser.add_argument('ticket_number', type=int)
        data = self.parser.parse_args()

        print(data)

        client = PaymentAccount.find_by_ticket_number(data.ticket_number)
        for i in range(len(data.id)):
            loan_item = LoanItem.get_by_id(data.id[i])
            LoanHistory.return_item(self, loan_item, ticket_number=data.ticket_number)
            client.return_money(loan_item.price)
