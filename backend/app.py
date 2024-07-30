from flask import Flask
from flask_cors import CORS
from .database import db
from .config import Config
from .routes import main as main_routes
import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app)

cred = credentials.Certificate(r'C:\Users\shikh\Downloads\flight-status-c32a4-firebase-adminsdk-t1yo0-1cd691ba26.json')
firebase_admin.initialize_app(cred)

with app.app_context():
    db.create_all()  # Create database tables

app.register_blueprint(main_routes)

if __name__ == '__main__':
    app.run(debug=True)
