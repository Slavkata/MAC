from app import db

class Ticket(db.Model):
    __tablename__ = 'Ticket'

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

class Client(db.Model):
    __tablename__ = 'Client'

    ticket_number = db.Column(db.ForeignKey('Ticket.ticket_number'), primary_key=True)
    name = db.Column(db.String())
    status = db.Column(db.Boolean())
    ongoing_loan = db.Column(db.Boolean())

    def __init__(self, ticket_number, name, status=False, ongoing_loan=False):
        self.ticket_number = ticket_number
        self.name = name
        self.status = status
        self.ongoing_loan = ongoing_loan

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'name': self.name,
            'status': self.status,
            'ongoing_loan': self.ongoing_loan
        }

class PaymentAccount(db.Model):
    __tablename__ = 'PaymentAccount'

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

class AccountDeposit(db.Model):
    __tablename__ = 'AccountDeposit'

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