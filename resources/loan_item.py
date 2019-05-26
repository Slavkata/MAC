from flask import jsonify
from flask_restful import Resource, reqparse

from models.account import PaymentAccount
from models.loan_item import LoanItem
from models.loan_history import  LoanHistory


from models.loan_history import LoanHistory


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
            loan_record = LoanHistory(data.ticket_number,data.id[i])
            loan_record.create()
            return loan_record.serialize();


            loan_item.loan()
            client.deduce(loan_item.price)
        return  {"message":"Just bring it back after"},201

    def delete(self):
        self.parser.add_argument('id', type=int, action='append')
        #self.parser.add_argument('ticket_number', type=int)
        data = self.parser.parse_args()
        for i in range(len(data.id)):
            loan_history = LoanHistory.get_by_id(data.id[i])
            client = PaymentAccount.find_by_ticket_number(loan_history.get_ticket_number())
            loan_item = LoanItem.get_by_id(loan_history.get_item_number())
            loan_history.return_item(loan_history.get_item_number())
            client.return_money(loan_item.price)
