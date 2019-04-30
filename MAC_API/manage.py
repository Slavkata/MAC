from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_sqlalchemy  import SQLAlchemy
from app import app
from db import  db

from models.ticket import Ticket
from models.user import User



from app import app
from db import db


migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()