from datetime import datetime

from models.db_init import db


class Ticket(db.Model):
    #
    #Make sure to provide a default value when changing from nullable=False to nullable=True
    #
    __tablename__ = 'tickets'
    __table_args__ = {'extend_existing': True}
    ticket_number = db.Column(db.Integer, primary_key=True,nullable=False)
    firstname = db.Column(db.String(30),nullable=False)
    lastname  = db.Column(db.String(30),nullable=False)
    email = db.Column(db.String(30),nullable=False)
    age =  db.Column(db.Integer,nullable=False)
    status = db.Column(db.Boolean,nullable=False,default=False)
    price = db.Column(db.Float(precision=2),nullable=False)
    camping_spot = db.Column(db.ForeignKey('campingspot.id'), nullable=True)
    created_at = db.Column(db.DateTime,default=datetime.utcnow())

    def __init__(self, ticket_number, firstname, lastname, email, age, price):
        self.ticket_number = ticket_number
        self.firstname = firstname
        self.lastname = lastname
        self.status = False
        self.email = email
        self.age = age
        self.price = price
        self.created_at = datetime.now()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def join_camping_spot(self, camping_spot):
        self.camping_spot = camping_spot
        db.session.commit()

    @classmethod
    def find_by_ticket_number(cls, ticket_number):
        return cls.query.filter_by(ticket_number=ticket_number).first()

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'firstname' : self.firstname,
            'lastname' :self.lastname,
            'email' : self.email,
            'age' :self.age,
            'price': self.price,
            'campingSpot': self.camping_spot
        }
