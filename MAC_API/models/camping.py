from db import db


class CampingSpot(db.Model):

    __tablename__ = "campingspots"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer)
    price = db.Column(db.Float())
    def __init__(self, name, location, capacity, price):
        self.name = name
        self.location = location
        self.capacity = capacity
        self.price = price

    def serialize(self):
        return {
            'name': self.name,
            'location': self.location, 
            'capacity': self.capacity,
            'price':self.price
        }