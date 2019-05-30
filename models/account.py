from models.db_init import db

class PaymentAccount(db.Model):
    __tablename__ = 'payment_accounts'

    ticket_number = db.Column(db.ForeignKey('tickets.ticket_number'), primary_key=True)
    balance = db.Column(db.Float)

    def __init__(self, ticket_number, balance):
        self.ticket_number = ticket_number
        self.balance = balance

    def __repr__(self):
        return '<Account {}>'.format(self.ticket_number)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def deduce(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            db.session.commit()
        else:
            raise Exception()

    def return_money(self, amount):
        self.balance += amount
        db.session.commit()

    @classmethod
    def find_by_ticket_number(cls, ticket_number):
        return cls.query.filter_by(ticket_number=ticket_number).first()

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'balance': self.balance
        }
