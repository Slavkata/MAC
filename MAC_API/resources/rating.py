from flask_restful import Resource,reqparse
from models.ratings import Ratings
from db import db
from flask import jsonify


class RatingResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('score',
                        type=int,
                        required=True,
                        
                        )
    parser.add_argument('description',
                        type=str,
                        required=True,
                        
                        )
    def post(self):
        data = self.parser.parse_args()
        user = Ratings(data.score, data.description)
      
        try:
            db.session.add(user)
            db.session.commit()
            return {'message': 'success user register '},201
        except:
            return {'message': 'success error register '},500



class RatingResourceGet(Resource):
    def get(self):
        try:
            return {'ratings':[rating.serialize() for rating in Ratings.query.all()]},200
        except:
            return {'message':'error'},404
        
