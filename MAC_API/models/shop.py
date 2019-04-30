from db import db 

class Shop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String())

    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name

    def serialize(self):
        return {
            'user_id': self.user_id,
            'name': self.name, 
        }