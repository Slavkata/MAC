from flask_restful import Resource,reqparse
from models.ticket import Ticket


class TicketResource(Resource):
    parser = reqparse.RequestParser()
    def get(self,ticket_number):
        data = self.parser.parse_args()
        return  Ticket.find_by_ticket_number(data['ticket_number']).serialize()
    def post(self):

        self.parser.add_argument('ticket_number', type=str, required=True, help="ticket_number can't be left blank")
        self.parser.add_argument('firstname',type=str,required=True,help="firstname can't be left blank")
        self.parser.add_argument('lastname',type=str,required=True,help="lastname can't be left blank")
        self.parser.add_argument('email',type=str,required=True,help="email can't be left blank")
        self.parser.add_argument('age',type=int,required=True,help="email can't be left blank")
        self.parser.add_argument('price',type=float,required=True,help="email can't be left blank")
        data = self.parser.parse_args()
        if Ticket.find_by_ticket_number(data.ticket_number) is not None:
            return {'message': "ticket number already in use"},400
        try:
            ticket = Ticket(data.ticket_number, data.firstname, data.lastname, data.email, data.age, data.price)
            ticket.save_to_db()
            return ticket.serialize(),201
        except:
            return {'message':"can't create ticket"},500

