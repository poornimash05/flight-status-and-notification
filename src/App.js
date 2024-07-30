import React, { useEffect, useState } from 'react';
import { fetchFlightStatus, updateFlightStatus, sendNotification } from './Services/api';
import { requestFCMToken, listenForMessages } from './Services/firebase';
import axios from 'axios';
function App() {
    const [flights, setFlights] = useState([]);
    const [passengerName, setPassengerName] = useState('');
    const [email, setEmail] = useState(['']);
    const [phoneNumber, setPhonenumber] = useState(['']);
    const [flightId, setFlightId] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    useEffect(() => {
        const getToken = async () => {
            const token = await requestFCMToken();
            if (token) {
                console.log("FCM Token:", token);
            }
        };

        getToken();
        listenForMessages((payload) => {
            console.log("Message received: ", payload);
        });

        const fetchData = async () => {
            const flightData = await fetchFlightStatus();
            setFlights(flightData);
        };

        fetchData();
    }, []);

    

    const handleStatusUpdate = async (flightId, newStatus) => {
        
        await updateFlightStatus(flightId, newStatus);

        const token = await requestFCMToken();

        await sendNotification(token, flightId, newStatus);

        const updatedFlights = await fetchFlightStatus();
        setFlights(updatedFlights);
    };
    
    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/book_flight', {
                PassengerName: passengerName,
                FlightID: flightId,
                Email: email,
                PhoneNumber: phoneNumber,
                NotificationToken: 'dzV9wCyxayI36c5O6pmm7n:APA91bEMPBgMsRQruIC682z_SejTpEE1iI4DUl-y2lWvaRrYTzGXkBBQTi141dEj1252B5-uDo1KPSAiOLXjD2kv7s_9G6mLxKm4TvqaNAcLnidM8lyLowpkH_61vMOou0CK4eSIiu2K' // Replace with actual token if needed
            });
            alert(response.data.message);
            setIsBooking(false); 
        } catch (error) {
            console.error("Error booking flight:", error);
        }
    };


    return (
        <div>
            <h1>Flight Status App</h1>
            <ul>
            <button onClick={() => setIsBooking(true)}>Book Flight</button>
            {isBooking && (
                <form onSubmit={handleBooking}>
                    <h2>Book a Flight</h2>
                    <select value={flightId} onChange={e => setFlightId(e.target.value)} required>
                        <option value="">Select Flight </option>
                        
                        {flights.map(flight => (
                            <option key={flight.FlightID} value={flight.FlightID}>
                                {flight.FlightNumber} 
                            </option>
                            
                        ))}
                        
                    </select>
                    <br></br>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        required
                    />
                    <br></br>
                    <input
                        type="text"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br></br>
                    <input
                        type="text"
                        placeholder="Your Phone No."
                        value={phoneNumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        required
                    />
                    <br></br>
                    <button type="submit">Book Flight</button>
                    <button type="button" onClick={() => setIsBooking(false)}>Cancel</button>
                </form>
            )}
            </ul>
            <ul>
                {flights.map((flight) => (
                    <li key={flight.flightId}>
                        {flight.FlightNumber} - {flight.Status} - Gate: {flight.Gate}
                        {flight.Status === 'On-Time' ? (
                            <button onClick={() => handleStatusUpdate(flight.FlightID, 'Delayed')}>
                                Update to Delayed
                            </button>
                        ) : (
                            <button onClick={() => handleStatusUpdate(flight.FlightID, 'On-Time')}>
                                Update to On Time
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            
        </div>
    );
}

export default App;