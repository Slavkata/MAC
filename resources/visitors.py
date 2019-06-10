from models.visitors_count import VisitorsCount
from flask_restful import Resource, reqparse
from flask import jsonify

class VisitorResource(Resource):
    def get(self):
        return jsonify(VisitorsCount.get_count())
