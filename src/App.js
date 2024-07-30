import React, { useEffect, useState } from 'react';
import { fetchFlightStatus, updateFlightStatus, sendNotification } from './Services/api';
import { requestFCMToken, listenForMessages } from './Services/firebase';
//import axios from 'axios';
function App() {
    const [flights, setFlights] = useState([]);
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
        // Update flight status in the database
        await updateFlightStatus(flightId, newStatus);
    
        // Get the FCM token
        const token = await requestFCMToken();
        
        // Send notification
        await sendNotification(token, flightId, newStatus);
        
        // Optionally, fetch updated flight status data
        const updatedFlights = await fetchFlightStatus();
        setFlights(updatedFlights);
    };
    
    

    return (
        <div>
            <h1>Flight Status App</h1>
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
};

export default App;