from flask import Blueprint, jsonify, request
from .models import Flight, Passenger, Notification
from .database import db
from firebase_admin import messaging
import smtplib  # For sending email notifications
  

main = Blueprint('main', __name__)

@main.route('/get_flight_status', methods=['GET'])
def get_flight_status():
    flights = Flight.query.all()
    return jsonify([{'FlightID': flight.flightid, 'FlightNumber': flight.flightnumber, 'Status': flight.status,'Gate':flight.gate} for flight in flights])

@main.route('/update_flight_status', methods=['POST'])
def update_flight_status():
    data = request.get_json()
    flight_id = data.get('flightid')
    status = data.get('status')
    new_gate = data.get('Gate')

    flight = Flight.query.get(flight_id)
    if flight:
        flight.status = status
        db.session.commit()

        return jsonify({'message': 'Flight status updated successfully'}), 200
    return jsonify({'message': 'Flight not found'}), 404


@main.route('/send_notification', methods=['POST'])
def send_notification():
    token = request.json.get('token')
    flight_id = request.json.get('flightid')
    status = request.json.get('status')

    message = messaging.Message(
        notification=messaging.Notification(
            title=f"Flight Status Update",
            body=f"Flight {flight_id} status updated to {status}."
        ),
        token=token
    )

    try:
        response = messaging.send(message)
        return jsonify({"success": True, "response": response})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@main.route('/book_flight', methods=['POST'])
def book_flight():
    data = request.get_json()
    passenger_name = data.get('PassengerName')
    flight_id = data.get('FlightID')
    email=data.get('Email')
    phonenumber=data.get('PhoneNumber')
    notification_token = data.get('NotificationToken')  

    # Check if the flight exists
    flight = Flight.query.get(flight_id)
    if not flight:
        return jsonify({'message': 'Flight not found'}), 404

    new_passenger = Passenger(
        firstname=passenger_name.split()[0], 
        lastname=passenger_name.split()[1] if len(passenger_name.split()) > 1 else '',  
        email=email,  
        phonenumber=phonenumber, 
        notificationpreference='email',  
        notification_token=notification_token 
    )
    
    db.session.add(new_passenger)
    db.session.commit()

    return jsonify({'message': 'Flight booked successfully!'}), 200