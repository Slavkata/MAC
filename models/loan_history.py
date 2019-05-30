from models.db_init import db
from datetime import datetime
from models.loan_item import  LoanItem

class LoanHistory(db.Model):
    __tablename__ = "loan_history"
    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('tickets.ticket_number'), nullable=False)
    item_number = db.Column(db.ForeignKey('loan_items.id'), nullable=False)
    returned = db.Column(db.Boolean,default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self,ticket_number,item_number):
        self.ticket_number = ticket_number
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

    def return_item(self, loan_item):
        loan_item.quantity += 1
        self.returned = True
        db.session.commit()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    def get_ticket_number(self):
        return self.ticket_number

    def get_item_number(self):
        return self.item_number

    def serialize(self):
        return {
            'id': self.id,
            'ticket_number': self.ticket_number,
            'item_number': self.item_number,
            'returned':self.returned
        }
