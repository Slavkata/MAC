from flask import jsonify
from flask_restful import Resource, reqparse

from models.review import Review


class ReviewsResource(Resource):
    parser = reqparse.RequestParser()

    def post(self):
        self.parser.add_argument('publisher', type=str, required=True, help='publisher name cannot be blank')
        self.parser.add_argument('rating', type=int, required=True, help='rating name cannot be blank')
        self.parser.add_argument('content', type=str, required=True, help='content name cannot be blank')
        data = self.parser.parse_args()

        try:
            review = Review(data.publisher, data.rating, data.content)
            review.publish()
            return jsonify(review.serialize())
        except:
            return {'message': 'error'}, 400

    def get(self):
        try:
            return jsonify(Review.get_all_reviews(self))
        except:
            return {"message": "error"}, 404
