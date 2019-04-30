from db import db

class PaymentAccount(db.Model):
    __tablename__ = 'payment_accounts'

    ticket_number = db.Column(db.ForeignKey('Ticket.ticket_number'), primary_key=True)
    balance = db.Column(db.Float)

    def __init__(self, ticket_number, balance):
        self.ticket_number = ticket_number
        self.balance = balance

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'balance': self.balance
        }
