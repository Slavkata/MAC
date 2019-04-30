from db import db 
from models.user import User
class Shop(db.Model):
    __tablename__ = "shops"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String())

    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name

    def serialize(self):
        return {
            'user_id': self.user_id,
            'name': self.name, 
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()