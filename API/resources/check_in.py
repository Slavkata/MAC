from models.ticket_history import TicketCheckInHistory
from flask_restful import Resource, reqparse
from models.ticket import Ticket
from models.visitors_count import VisitorsCount
from flask import jsonify

class CheckInResource(Resource):
    parser = reqparse.RequestParser()

    #check-in
    def post(self):
        self.parser.remove_argument('ticket_number')
        self.parser.add_argument('ticket_number', type=int, required=True)
        ticket_number = self.parser.parse_args().ticket_number

        ticket = Ticket.find_by_ticket_number(ticket_number=ticket_number)
        history = TicketCheckInHistory.find_by_ticket_number(ticket_number)
        if history is None:
            history = TicketCheckInHistory(ticket_number)
            history.save_to_db()

        if ticket is not None and history.current_status is not True:
            VisitorsCount(is_check_in=True).create()
            return jsonify(history.check_in())
        else:
            return {'message': 'no such ticket'}, 400

    def get(self):
        self.parser.remove_argument('ticket_number')
        self.parser.add_argument('ticket_number', type=int, location='args', required=True)
        ticket_number = self.parser.parse_args().ticket_number

        check_in = TicketCheckInHistory.find_by_ticket_number(ticket_number)

        if check_in is None:
            check_in = TicketCheckInHistory(ticket_number)
            check_in.save_to_db()

        return jsonify(check_in.serialize())

    #check-out
    def delete(self):
        self.parser.remove_argument('ticket_number')
        self.parser.add_argument('ticket_number', type=int, required=True)
        ticket_number = self.parser.parse_args().ticket_number

        ticket = Ticket.find_by_ticket_number(ticket_number=ticket_number)
        history = TicketCheckInHistory.find_by_ticket_number(ticket_number)
        if history is None:
            history = TicketCheckInHistory(ticket_number)
            history.save_to_db()


        if ticket is not None and history.current_status is not False:
            VisitorsCount(is_check_in=False).create()
            return jsonify(history.check_out())
        else:
            return {'message': 'no such ticket'}, 400
