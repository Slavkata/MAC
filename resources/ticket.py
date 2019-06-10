import random
from flask_restful import Resource, reqparse
from Email.email_service import ticket_message
from Generators import QR, Tickets
from models.account import PaymentAccount
from models.ticket import Ticket
from flask import jsonify


class TicketResource(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('ticket_number', type=str, location='args')
        data = self.parser.parse_args()

        if data.ticket_number is None:
            return {'total_tickets': len(Ticket.query.all())}

        return jsonify(Ticket.find_by_ticket_number(data.ticket_number).serialize())

    def post(self):
        self.parser.add_argument('firstname', type=str, required=True, action='append')
        self.parser.add_argument('lastname', type=str, required=True, action='append')
        self.parser.add_argument('email', type=str, required=True, action='append')
        self.parser.add_argument('age', type=int, required=True, action='append')
        self.parser.add_argument('price', type=float, required=True, action='append')
        data = self.parser.parse_args()
        print(data)

        result = []
        for i in range(len(data.firstname)):
            #worst id generator
            while True:
                ticket_number = random.randint(100000, 999999)
                if Ticket.find_by_ticket_number(ticket_number) is None:
                    break

            ticket = Ticket(ticket_number, data.firstname[i], data.lastname[i], data.email[i], data.age[i], data.price[i])
            ticket.save_to_db()
            payment_account = PaymentAccount(ticket_number, 0)
            payment_account.save_to_db()
            QR.generator.generate(ticket_number)
            Tickets.pdf_generator.generate_tickets([ticket_number], [data.firstname[i] + ' ' + data.lastname[i]])
            ticket_message(data.email[i], ticket_number)
            result.append(ticket.serialize())

        return result
