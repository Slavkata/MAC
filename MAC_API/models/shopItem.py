from db import db 

class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True,nullable=False)
    name = db.Column(db.String(50),nullable=False)
    description = db.Column(db.String(30),nullable=False)
    quantity  = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float(),nullable=False)
    

    def __init__(self, name, description, quantity, price):
        self.name = name
        self.description = description
        self.quantity = quantity
        self.price = price

    def serialize(self):
        return {
            'name': self.name,
            'description': self.description, 
            'quantity':self.quantity,
            'price': self.price
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()