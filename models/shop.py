from models.db_init import db


class Shop(db.Model):
    __tablename__ = "shops"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(20), nullable=False)
    items_sold = db.Column(db.Integer, nullable=False)

    # profit need to be removed
    profit = db.Column(db.Integer, nullable=False)

    def __init__(self, name, location, category):
        self.name = name
        self.location = location
        self.category = category
        self.items_sold = 0
        self.profit = 0

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.serialize()
    #related to profits need to be removed
    def update_sold_items(self, items_sold):
        self.items_sold += items_sold
        db.session.commit()

    def update_profit(self, profit):
        self.profit += profit
        db.session.commit()
    ###
    @classmethod
    def find_by_category(cls, category):
        result = []
        shops = cls.query.filter_by(category=category)
        for s in shops:
            result.append(s.serialize())
        return result

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'items_sold': self.items_sold,
            'profit': self.profit
        }
