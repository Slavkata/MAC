from db import db


class CampingSpot(db.Model):

    __tablename__ = "campingspot"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    longitude = db.Column(db.Float())
    latitude = db.Column(db.Float())
    capacity = db.Column(db.Integer)
    price = db.Column(db.Float())

    def __init__(self, name, longitude,latitude, capacity, price):
        self.name = name
        self.longitude = longitude
        self.latitude = latitude
        self.capacity = capacity
        self.price = price

    def serialize(self):
        return {
            'name': self.name,
            'longitude': self.longitude,
            'latitude' : self.latitude,
            'capacity': self.capacity,
            'price':self.price
        }
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()