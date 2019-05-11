from json import dumps

from flask import jsonify
from flask_restful import Resource, request

from models.review import Review


class ReviewsResource(Resource):
    def post(self):
        data = request.get_json()
        review = Review(data['publisher'], data['rating'], data['content'])
        try:
            review.publish()
            return jsonify(review.serialize())
        except:
            return {'message': 'error'}, 400

    def get(self):
        try:
            return dumps(Review.get_all_reviews()), 201
        except:
            return {"message": "error"}, 404
