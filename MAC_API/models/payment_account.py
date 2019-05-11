from models.db_init import db


class PaymentAccount(db.Model):
    __tablename__ = 'paymentAccount'

    ticket_number = db.Column(db.ForeignKey('ticket.ticket_number'), primary_key=True)
    balance = db.Column(db.Float)

    def __init__(self, ticket_number):
        self.ticket_number = ticket_number
        self.balance = 0

    def __repr__(self):
        return "<ticket_number {}>".format(self.ticket_number)

    def create(self):
        db.session.add(self)
        db.session.commit()

    def __serialize__(self):
        return {
            'ticket_number': self.ticket_number,
            'balance': self.balance
        }
