from flask import Flask
from flask_restful import Api
from  flask_jwt import JWT
from security.security import authenticate,identity
from resources.ticket import StatusChangeResource


app = Flask(__name__)
api = Api(app)

app.secret_key = 'blablaabla'

jwt = JWT(app,authenticate,identity)


#app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mac.db'



#status change resources
api.add_resource(StatusChangeResource,'/status/<string:ticket_number>/check')


'''
if __name__ == '__main__':
    from manage import  db
    db.init_app(app)
    app.run(port=5000,debug=True)
'''


