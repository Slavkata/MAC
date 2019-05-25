from flask_restful import Resource, reqparse
from models.shop_item import ShopItem

class ShopItemsResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('id', type=int, location='args')
        self.parser.add_argument('shop', type=int, location='args')
        self.parser.add_argument('category', type=str, location='args')

    def post(self):
        self.parser.add_argument('name', type=str)
        self.parser.add_argument('category', type=str)
        self.parser.add_argument('price', type=float)
        self.parser.add_argument('shop', type=int)
        data = self.parser.parse_args()

        shop_item = ShopItem(data.name, data.)