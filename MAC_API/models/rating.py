from db import db

class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer,primary_key=True)
    score = db.Column(db.String(80))
    description = db.Column(db.String(100))
    def __init__(self, score, description):
        #self.id = _id
        self.score = score
        self.description = description
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    def serialize(self):
        return {
            'score': self.score,
            'description': self.description, 
        }

        

   
