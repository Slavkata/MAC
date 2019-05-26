from flask import jsonify
from flask_restful import Resource, reqparse

from models.account import PaymentAccount
from models.loan_item import LoanItem


class LoanItemsResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('id', type=int, location='args')
        self.parser.add_argument('shop', type=int, location='args')
        self.parser.add_argument('category', type=str, location='args')
        data = self.parser.parse_args()

        if data.category is not None:
            return jsonify(LoanItem.find_by_category(data.category).serialize())
        elif data.id is not None:
            return jsonify(LoanItem.get_by_id(data.id).serialize())
        elif data.category is not None:
            return jsonify(LoanItem.get_by_shop(data.shop).serialize())
        else:
            return jsonify(LoanItem.get_all())

    def post(self):
        self.parser.add_argument('name', type=str)
        self.parser.add_argument('category', type=str)
        self.parser.add_argument('price', type=float)
        self.parser.add_argument('shop', type=int)
        self.parser.add_argument('left', type=int)
        data = self.parser.parse_args()

        shop_item = LoanItem(data.name, data.category, data.price, data.shop, data.left)
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
            loan_item.loan(data.ticket_number)
            client.deduce(loan_item.price)

    def delete(self):
        self.parser.add_argument('id', type=int, action='append')
        self.parser.add_argument('ticket_number', type=int)
        data = self.parser.parse_args()

        for i in range(len(data.id)):
            loan_item = LoanItem.get_by_id(data.id[i])
            client = PaymentAccount.find_by_ticket_number(data.ticket_number)
            loan_item.return_item()
            client.return_money(loan_item.price)
