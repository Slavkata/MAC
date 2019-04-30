from flask_restful import Resource
from models.ticket import Ticket



class StatusChangeResource(Resource):
    def get(self,ticket_number):
        ticket  =Ticket.find_by_ticket_number(ticket_number)
        if  ticket:
             if ticket.status == True:
                 ticket.status = False
             elif ticket.status == False:
                 ticket.status = True
             ticket.save_to_db()
             return {'message': 'success status change'}, 200
        else:
            return {'message':'ticket not found'},404