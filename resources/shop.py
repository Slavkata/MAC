from flask import jsonify
from flask_restful import Resource, reqparse

from models.shop import Shop


class ShopResource(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('name', type=str, required=True, help='specify shop name')
        self.parser.add_argument('location', type=str, required=True, help='specify shop location')
        self.parser.add_argument('category', type=str, required=True, help='specify shop category')
        data = self.parser.parse_args()

        shop = Shop(data.name, data.location, data.category)
        shop.create()

        return jsonify(shop.serialize())

    def get(self):
        self.parser.add_argument('id', type=int, location='args')
        self.parser.add_argument('category', type=str, location='args')
        data = self.parser.parse_args()
        if data.id is not None:
            return jsonify(Shop.get_by_id(data.id).serialize())
        else:
            return jsonify(shop.serialize() for shop in Shop.find_by_category(data.category))

    def put(self):
        self.parser.remove_argument('name')
        self.parser.remove_argument('location')
        self.parser.remove_argument('category')
        self.parser.add_argument('id', type=int, required=True)
        self.parser.add_argument('profit', type=int, required=True)
        self.parser.add_argument('items_sold', type=int, required=True)
        data = self.parser.parse_args()
        shop = Shop.get_by_id(data.id)

        shop.update_profit(data.profit)
        shop.update_sold_items(data.items_sold)

        return jsonify(shop.serialize())
