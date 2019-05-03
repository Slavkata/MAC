from app import db

class Ticket(db.Model):
    __tablename__ = 'Ticket'

    ticket_number = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float())

    def __init__(self, ticket_number, price):
        self.ticket_number = ticket_number
        self.price = price

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'price': self.price
        }

class Client(db.Model):
    __tablename__ = 'Client'

    ticket_number = db.Column(db.ForeignKey('Ticket.ticket_number'), primary_key=True)
    name = db.Column(db.String())
    status = db.Column(db.Boolean())
    ongoing_loan = db.Column(db.Boolean())

    def __init__(self, ticket_number, name, status=False, ongoing_loan=False):
        self.ticket_number = ticket_number
        self.name = name
        self.status = status
        self.ongoing_loan = ongoing_loan

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'name': self.name,
            'status': self.status,
            'ongoing_loan': self.ongoing_loan
        }

class PaymentAccount(db.Model):
    __tablename__ = 'PaymentAccount'

    ticket_number = db.Column(db.ForeignKey('Ticket.ticket_number'), primary_key=True)
    balance = db.Column(db.Float)

    def __init__(self, ticket_number, balance):
        self.ticket_number = ticket_number
        self.balance = balance

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'ticket_number': self.ticket_number,
            'balance': self.balance
        }

class AccountDeposit(db.Model):
    __tablename__ = 'AccountDeposit'

    deposit_number = db.Column(db.Integer, primary_key=True)
    ticket_number = db.Column(db.ForeignKey('Ticket.ticket_number'))
    amount = db.Column(db.Float)

    def __init__(self, deposit_number, ticket_number, amount):
        self.deposit_number = deposit_number
        self.ticket_number = ticket_number
        self.amount = amount

    def __repr__(self):
        return '<ticketNumber {}>'.format(self.ticket_number)

    def serialize(self):
        return {
            'deposit_number': self.deposit_number,
            'ticket_number': self.ticket_number,
            'amount': self.amount
        }


class Shop(db.Model):
    __tablename__ = 'Shop'

    shop_number = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, shop_number, name):
        self.shop_number = shop_number
        self.name = name

    def __repr__(self):
        return '<shopNumber {}>'.format(self.shop_number)

    def serialize(self):
        return {
            'shop_number': self.shop_number,
            'name': self.name
        }


class LoanItem(db.Model):
    __tablename__ = 'LoanItem'

    item_number = db.Column(db.Integer, primary_key=True)
    shop_number = db.Column(db.ForeignKey('Shop.shop_number'))
    price = db.Column(db.Float)
    loan_order = db.Column(db.Integer)
    description = db.Column(db.String)
    available = db.Column(db.Boolean)
    name = db.Column(db.String)

    def __init__(self, item_number, shop_number, price, loan_order, description,
                 available, name):
        self.item_number = item_number
        self.shop_number = shop_number
        self.price = price
        self.loan_order = loan_order
        self.description = description
        self.available = available
        self.name = name

    def __repr__(self):
        return '<item_number {}>'.format(self.item_number)

    def serialize(self):
        return {
            'item_number': self.item_number,
            'shop_numbber': self.shop_number,
            'price': self.price,
            'loan_order': self.loan_order,
            'description': self.description,
            'available': self.available,
            'name': self.name
        }


class LoanOrderItem(db.Model):
    __tablename__ = 'LoanOrderItem'

    item_number = db.Column(db.ForeignKey('LoanItem.item_number'), primary_key=True)
    order_number = db.Column(db.ForeignKey('LoanOrder.order_number'), primary_key=True)
    price = db.Column(db.Float)

    def __init__(self, item_number, order_number, price):
        self.item_number = item_number
        self.order_number = order_number
        self.price = price

    def __repr__(self):
        return '<item_number {}>'.format(self.item_number)

    def serialize(self):
        return {
            'item_number': self.item_number,
            'order_number': self.order_number,
            'price': self.price
        }


class LoanOrder(db.Model):
    __tablename__ = 'LoanOrder'

    order_number = db.Column(db.Integer, primary_key=True)
    client_number = db.Column(db.ForeignKey('Client.ticket_number'))
    return_time = db.Column(db.DateTime)

    def __init__(self, order_number, client_number, return_time):
        self.order_number = order_number
        self.client_number = client_number
        self.return_time = return_time

    def __repr__(self):
        return '<order_number {}>'.format(self.order_number)

    def serialize(self):
        return {
            'order_number': self.order_number,
            'client_number': self.client_number,
            'return_time': self.return_time
        }


class ShopItem(db.Model):
    __tablename__ = 'ShopItem'

    item_number = db.Column(db.Integer, primary_key=True)
    shop_number = db.Column(db.ForeignKey('Shop.shop_number'))
    name = db.Column(db.String)
    price = db.Column(db.Float)

    def __init__(self, item_number, shop_number, name, price):
        self.item_number = item_number
        self.shop_number = shop_number
        self.name = name
        self.price = price

    def __repr__(self):
        return '<item_number {}>'.format(self.item_number)

    def serialize(self):
        return {
            'item_number': self.item_number,
            'shop_number': self.shop_number,
            'name': self.name,
            'price': self.price
        }


class SaleOrder(db.Model):
    __tablename__ = 'SaleOrder'

    sale_number = db.Column(db.Integer, primary_key=True)
    client_number = db.Column(db.ForeignKey('Client.ticket_number'))

    def __init__(self, sale_number, client_number):
        self.sale_number = sale_number
        self.client_number = client_number

    def __repr__(self):
        return '<sale_number {}>'.format(self.sale_number)

    def serialize(self):
        return {
            'sale_number': self.sale_number,
            'client_number': self.client_number
        }


class SaleOrderItems(db.Model):
    __tablename__ = 'SaleOrderItems'

    sale_number = db.Column(db.ForeignKey('SaleOrder.sale_number'), primary_key=True)
    item_number = db.Column(db.ForeignKey('ShopItem.item_number'), primary_key=True)

    def __init__(self, sale_number, item_number):
        self.sale_number = sale_number
        self.item_number = item_number

    def __repr__(self):
        return '<sale_number {}>'.format(self.sale_number)

    def serialize(self):
        return {
            'sale_number': self.sale_number,
            'item_number': self.item_number
        }
