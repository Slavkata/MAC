from models.db_init import db

class ShopItem(db.Model):

    __tablename__ = "shop_items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Float, nullable=False)
    shop = db.Column(db.ForeignKey('shops.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, name, category, price, shop, quantity):
        self.name = name
        self.category = category
        self.price = price
        self.shop = shop
        self.quantity = quantity

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.serialize()

    @classmethod
    def find_by_category(cls, category):
        result = []
        shop_items = cls.query.filter_by(category=category).all()
        for s in shop_items:
            result.append(s.serialize())
        return result

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_by_shop(cls, shop):
        result = []
        shop_items = cls.query.filter_by(shop=shop).all()
        for s in shop_items:
            result.append(s.serialize())
        return result

    def sell(self):
        self.quantity -= 1
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price,
            'quantity': self.quantity
        }
