import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchFlightStatus = async () => {
    const response = await axios.get(`${API_URL}/get_flight_status`);
    return response.data;
};

export const updateFlightStatus = async (flightId, status) => {
    await axios.post(`${API_URL}/update_flight_status`, {
        flightid: flightId,
        status: status,
    });
};

export const sendNotification = async (token, flightId, status) => {
    await axios.post(`${API_URL}/send_notification`, {
        token,
        flightid: flightId,
        status: status,
    });
};
