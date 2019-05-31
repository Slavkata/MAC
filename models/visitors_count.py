from models.db_init import db
import datetime

class VisitorsCount(db.Model):

    __tablename__ = 'visitors_count'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    is_check_in = db.Column(db.Boolean, nullable=False)

    def __init__(self, is_check_in):
        self.is_check_in = is_check_in

    def create(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_count(cls):
        result = []
        visitors = cls.query.all()
        for v in visitors:
            result.append(v.serialize())
        return result

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'createdAt': self.created_at,
            'isCheckIn': self.is_check_in
        }