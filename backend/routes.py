from flask import Blueprint, jsonify, request
from .models import Flight, Passenger, Notification
from .database import db
from firebase_admin import messaging

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
        #flight.gate = new_gate
        db.session.commit()
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
    
