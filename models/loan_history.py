from models.db_init import db


class LoanHistory(db.Model):
    __tablename__ = "loan_history"
    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('tickets.id'), nullable=False)
    item_number = db.Column(db.ForeignKey('loan_items.id'), nullable=False)

    def __init__(self,ticket_number,item_number):
        self.ticket_number = ticket_number,
        self.item_number = item_number
    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.serialize()

    @classmethod
    def get_all(cls):
        result = []
        history = LoanHistory.query.all()
        for l in history:
            result.append(l.serialize())
        return result
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)
    def serialize(self):
        return {
            'id': self.id,
            'ticket_number': self.ticket_number,
            'item_number': self.item_number,
        }
