from flask_restful import Resource

from models.ticket import Ticket,TicketCheckInHistory



class StatusChangeResource(Resource):
    def get(self,ticket_number):
        ticket  =Ticket.find_by_ticket_number(ticket_number)
        if  ticket:
             if ticket.status == True:
                 history = TicketCheckInHistory(ticket_number, True, False)
                 history.save_to_db()
                 ticket.status = False
             elif ticket.status == False:
                 history = TicketCheckInHistory(ticket_number,False, True)
                 history.save_to_db()
                 ticket.status = True
             ticket.save_to_db()
             return {'message': 'success status change'}, 200
        else:
            return {'message':'ticket not found'},404