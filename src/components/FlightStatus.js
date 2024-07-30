import React from 'react';

const FlightStatus = ({ flights }) => {
    return (
        <div>
            <h2>Flight Status</h2>
            <ul>
                {flights.map(flight => (
                    <li key={flight.FlightID}>
                        {flight.FlightNumber} - {flight.Status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightStatus;
