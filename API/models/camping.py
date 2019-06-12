from models.db_init import db

class CampingSpots(db.Model):

    __tablename__ = "campingspot"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    region = db.Column(db.String(1), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    reserved = db.Column(db.Boolean, nullable=False)

    def __init__(self, name, region, number, price):
        self.name = name
        self.region = region
        self.number = number
        self.price = price
        self.reserved = False

    def get_all_spots(self):
        list = []
        spots = CampingSpots.query.all()
        for s in spots:
            list.append(s.serialize())
        return list

    def reserve(self, id):
        spot = CampingSpots.query.get(id)
        spot.reserved = True
        db.session.commit()
        return spot

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.serialize()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'region': self.region,
            'number': self.number,
            'price': self.price,
            'reserved': self.reserved
        }