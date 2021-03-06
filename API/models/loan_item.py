from models.db_init import db


class LoanItem(db.Model):
    __tablename__ = "loan_items"
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
    def get_all(cls):
        result = []
        loan_items = LoanItem.query.all()
        for l in loan_items:
            result.append(l.serialize())

        return result

    @classmethod
    def find_by_category(cls, category):
        result = []
        loan_items = cls.query.filter_by(category=category)
        for l in loan_items:
            result.append(l.serialize())

        return result

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_by_shop(cls, shop):
        result = []
        loan_items = cls.query.filter_by(shop=shop)
        for l in loan_items:
            result.append(l.serialize())

        return result

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price,
            'quantity': self.quantity,
        }
