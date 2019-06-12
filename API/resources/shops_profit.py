from flask_restful import Resource, reqparse
from models.shop_item import ShopItem

class ShopsProfit(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('shop', type=int, required=True, location='args')
        shop_id = self.parser.parse_args().shop

        shop_item = ShopItem.get_sold_by_shop(shop_id)

        return {'profit': shop_item}
