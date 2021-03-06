from datetime import datetime

from models.db_init import db


class AccountDeposit(db.Model):
    __tablename__ = 'account_deposists'

    deposit_number = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('tickets.ticket_number'))
    amount = db.Column(db.Float)
    created_at = db.Column(db.DateTime,default=datetime.utcnow())

    def __init__(self, ticket_number, amount):
        self.ticket_number = ticket_number
        self.amount = amount

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_ticket_number(cls, ticket_number):
        result = []
        deposits = cls.query.filter_by(ticket_number=ticket_number).all()
        for d in deposits:
            result.append(d.serialize())
        return result

    @classmethod
    def get_all_deposited_money(cls):
        result = 0
        deposits = cls.query.all()
        for d in deposits:
            result += d.amount
        return result

    def serialize(self):
        return {
            'deposit_number': self.deposit_number,
            'ticket_number': self.ticket_number,
            'amount': self.amount
        }

