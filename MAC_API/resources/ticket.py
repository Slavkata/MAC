from flask_restful import Resource,reqparse
from models.ticket import Ticket


class TicketResource(Resource):
    def get(self,ticket_number):
        return  {'ticket':ticket_number}