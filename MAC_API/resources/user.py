from flask_restful import Resource,reqparse
from models.user import User


class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help = "username ca't be left blank"
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="password can't be left blank"
                        )
    def post(self):
        data = self.parser.parse_args()
        if User.find_by_username(data['username']) is not None:
            return {'message':'username already in use'},400
        else:
            user = User(**data)
            try:
                user.save_to_db()
                return {'message': 'success user register '},201
            except:
                return {'message': 'failed  user register '},500

