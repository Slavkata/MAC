from flask_restful import Resource, reqparse
from Atmlogs.depositing import main
from flask import jsonify, request
from models.deposit import AccountDeposit

class AtmDepositResource(Resource):
    parser = reqparse.RequestParser()  
    
    def get(self):
        return jsonify("ok")

    def post(self):
        file = request.files['file']
        new_t = file.read()
        t = new_t.decode("utf-8") 
        name = t.split('\n')
        ticket_number = name[4:]
        dticket = ""
        damount = ""
        i = 0
        while i < len(ticket_number):
            new = ticket_number[0].split(' ')

            dticket = new[0]
            damount = new[1].strip()
            deposit = AccountDeposit(int(dticket), float(damount))
            deposit.save_to_db()
            i += 1
        return  damount



    


        