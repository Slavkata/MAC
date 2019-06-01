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

    def loan_item(self, loan_item, ticket_number):
        loan_item.quantity -= 1
        self.ticket_number = ticket_number
        self.returned = False
        db.session.add(self)
        db.session.commit()

    def return_item(self, loan_item, ticket_number):
        his = LoanHistory.query.filter_by(ticket_number=ticket_number, item_number=loan_item.id, returned=False).first()
        loan_item.quantity += 1
        his.returned = True
        db.session.commit()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    @classmethod
    def get_by_ticket_number(cls, ticket_number):
        result = []
        item = LoanHistory.query.fileter_by(ticket_number=ticket_number).first()
        for i in item:
            result.append(i.serialize())
        return result

    def serialize(self):
        return {
            'id': self.id,
            'ticket_number': self.ticket_number,
            'item_number': self.item_number,
            'returned':self.returned
        }
