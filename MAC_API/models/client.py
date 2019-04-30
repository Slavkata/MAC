from db import db

class Client(db.Model):
    __tablename__ = 'clients'
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