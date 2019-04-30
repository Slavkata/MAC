from db import db

class AccountDeposit(db.Model):
    __tablename__ = 'account_deposists'

    deposit_number = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('Ticket.ticket_number'))
    amount = db.Column(db.Float)

    def __init__(self, deposit_number, ticket_number, amount):
        self.deposit_number = deposit_number
        self.ticket_number = ticket_number
        self.amount = amount

    def serialize(self):
        return {
            'deposit_number': self.deposit_number,
            'ticket_number': self.ticket_number,
            'amount': self.amount
        }