from flask_restful import Resource,reqparse
from models.rating import Rating
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
        user = Rating(data.score, data.description)
      
        try:
            db.session.add(user)
            db.session.commit()
            return {'message': 'success user register '},201
        except:
            return {'message': 'success error register '},500



class RatingListResource(Resource):
    def get(self):
        try:
            return {'ratings':[rating.serialize() for rating in Rating.query.all()]},200
        except:
            return {'message':'cant find ratings'},404
        
