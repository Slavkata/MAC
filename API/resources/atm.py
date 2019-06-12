from flask import request
from flask_restful import Resource

from Atmlogs.depositing import deposit


class AtmDepositResource(Resource):
    def post(self):
        file = request.files['files'].read()
        try:
            deposit(file)
            return {'message': 'success'}, 200
        except:
            return {'message': 'something went wrong'}, 500
