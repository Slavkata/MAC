from datetime import datetime
from models.db_init import db

class TicketCheckInHistory(db.Model):
    #
    #Make sure to provide a default value when changing from nullable=False to nullable=True
    #
    __tablename__ = 'ticket_histories'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('tickets.ticket_number'))
    prev_status = db.Column(db.Boolean, nullable=False, default=False)
    current_status = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, ticket_number):
        self.ticket_number = ticket_number

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_ticket_number(cls, ticket_number):
        return cls.query.filter_by(ticket_number=ticket_number).first()

    def check_in(self):
        self.prev_status = self.current_status
        self.current_status = True
        db.session.commit()
        return self.serialize()

    def check_out(self):
        self.prev_status = self.current_status
        TicketCheckInHistory.query.filter_by(ticket_number=self.ticket_number).update(dict(current_status=False))
        db.session.commit()
        self.current_status = False
        return self.serialize()

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'id': self.id,
            'ticket_number': self.ticket_number,
            'current_status': self.current_status,
            'created_at': self.created_at
        }
