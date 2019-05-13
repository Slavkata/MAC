from models.db_init import db

class CampingSpots(db.Model):

    __tablename__ = "campingspot"
    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('tickets.ticket_number'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    reserved = db.Column(db.Boolean, nullable=False)

    def __init__(self, ticket_nubmer, name, location, capacity, price):
        self.name = name
        self.location = location
        self.capacity = capacity
        self.price = price
        self.reserved = False
        self.ticket_number = ticket_nubmer

    def get_free_spots(self):
        list = []
        spots = CampingSpots.query.filter_by(reserved=False).all()
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

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'capacity': self.capacity,
            'price': self.price,
            'reserved': self.reserved
        }