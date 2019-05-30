from flask_restful import Resource, reqparse
from models.shop_item import ShopItem
from flask import jsonify
from models.account import PaymentAccount

class ShopItemsResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('id', type=int, location='args')
        self.parser.add_argument('shop', type=int, location='args')
        self.parser.add_argument('category', type=str, location='args')
        data = self.parser.parse_args()

        if data.category is not None:
            return jsonify(ShopItem.find_by_category(data.category))
        elif data.id is not None:
            return jsonify(ShopItem.get_by_id(data.id).serialize())
        elif data.shop is not None:
            return jsonify(ShopItem.get_by_shop(data.shop))


    def post(self):
        self.parser.add_argument('name', type=str)
        self.parser.add_argument('category', type=str)
        self.parser.add_argument('price', type=float)
        self.parser.add_argument('shop', type=int)
        self.parser.add_argument('quantity', type=int)
        data = self.parser.parse_args()

        shop_item = ShopItem(data.name, data.category, data.price, data.shop, data.quantity)
        shop_item.create()
        return jsonify(shop_item.serialize())

    def put(self):
        # purchase
        self.parser.add_argument('id', type=int, action='append')
        self.parser.add_argument('ticket_number', type=int)
        data = self.parser.parse_args()

        for i in range(len(data.id)):
            shop_item = ShopItem.get_by_id(data.id[i])
            client = PaymentAccount.find_by_ticket_number(data.ticket_number)
            try:
                client.deduce(shop_item.price)
                shop_item.sell()
            except:
                return {'message' : 'unsuccessful'}, 500

        return {'message' : 'success'}, 200
