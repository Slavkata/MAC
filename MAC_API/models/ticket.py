from db import db

class Ticket(db.Model):
    __tablename__ = 'tickets'

    ticket_number = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float())

    def __init__(self, ticket_number, price):
        self.ticket_number = ticket_number
        self.price = price

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'price': self.price
        }