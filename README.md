<-----Flight Status and Notification Application Overview------->

The Flight Status Application is a web-based platform that allows users to view flight status, edit flight status, and receive real-time updates about their bookings. The application is built using a Flask backend and a React frontend, leveraging Firebase Cloud Messaging for notifications.

-->Technologies used: 
   (a) Frontend: HTML, CSS, React js.
   (b) Backend: Python.
   (c) Database: PostgreSQL.
   (d) Notifications: Firebase Cloud Messaging.
   
-->Key Features
  1. Flight Status Display:
     - Users can view a list of available flights along with their current statuses (e.g., On Time, Delayed, Cancelled).
     - Each flight entry includes details such as the flight number, current status, and gate number.
  2. Real-Time Notifications:
     - The application integrates Firebase Cloud Messaging (FCM) to send real-time notifications to passengers regarding flight status updates and gate changes.
     - Notifications are sent when the flight status changes (e.g., from On Time to Delayed) or when there is a gate change.
  3. Edit Flight Status:
     - An edit button allows authorized users to update the status of a flight. This includes changing the status to Delayed .
     - The application provides a user-friendly interface statuses.
  4. Flight Booking:
     - Users can book a flight by selecting a flight ID and entering their name and required details.
     - Upon successful booking, the application stores the passenger's information in the database, including their notification token for future updates.

-->Technical Architecture
  1. Backend:
     - Built using Flask, the backend handles API requests for fetching flight status, editing , and updating flight information.
     - SQLAlchemy is used for ORM (Object-Relational Mapping) to interact with the PostgreSQL database, which stores flight and passenger data.
     - The backend includes error handling for invalid requests and manages notifications using Firebase Admin SDK.
  2. Frontend:
     - Developed with React, the frontend provides a dynamic user interface for interacting with flight data.
     - The application uses Axios for making HTTP requests to the Flask backend.
     
