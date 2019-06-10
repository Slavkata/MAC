from models.db_init import db

class SpendingHistory(db.Model):

    __tablename__ = 'spending_history'
    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Float, default=0)

    def __init__(self, ticket_number):
        self.ticket_number = ticket_number

    @classmethod
    def get_by_ticket_number(cls, ticket_number):
        return cls.query.filter_by(ticket_number=ticket_number).first()

    @classmethod
    def get_all_spendings(cls):
        result = 0
        spendings = cls.query.all()
        for s in spendings:
            result += s.amount
        return result

    def create(self):
        db.session.add(self)
        db.session.commit()

    def add_expense(self, amount):
        self.amount += amount
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'ticket_number': self.ticket_number,
            'amount': self.amount
        }
