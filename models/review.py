from datetime import datetime

from models.db_init import db


class Review(db.Model):
    __tablename__ = 'review'
    review_id = db.Column(db.Integer, primary_key=True)
    publisher = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __init__(self, publisher, rating, content):
        self.publisher = publisher
        self.rating = rating
        self.content = content
        self.date = datetime.now()

    def __repr__(self):
        return '<review_id {}>'.format(self.review_id)

    def publish(self):
        db.session.add(self)
        db.session.commit()

    def get_all_reviews(self):
        result = []
        reviews = Review.query.all()
        for r in reviews:
            result.append(r.serialize())

        return result

    def serialize(self):
        return {
            'review_id': self.review_id,
            'publisher': self.publisher,
            'rating': self.rating,
            'content': self.content,
            'date': self.date
        }
