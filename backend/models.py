from datetime import datetime
from .database import db


class Flight(db.Model):
    flightid = db.Column(db.Integer, primary_key=True)
    flightnumber = db.Column(db.String(10), nullable=False)
    departuredatetime = db.Column(db.DateTime, nullable=False)
    arrivaldatetime = db.Column(db.DateTime, nullable=False)
    originairportcode = db.Column(db.String(3), nullable=False)
    destinationairportcode = db.Column(db.String(3), nullable=False)
    availableseats = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    gate = db.Column(db.String(10), nullable=True)
    
class Passenger(db.Model):
    passengerid = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phonenumber = db.Column(db.String(20), nullable=False)
    notificationpreference = db.Column(db.String(10), nullable=False)
    notification_token = db.Column(db.String(255), nullable=True)

class Notification(db.Model):
    notificationid = db.Column(db.Integer, primary_key=True)
    flightid = db.Column(db.Integer, db.ForeignKey('flight.FlightID'))
    passengerid = db.Column(db.Integer, db.ForeignKey('passenger.PassengerID'))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
 