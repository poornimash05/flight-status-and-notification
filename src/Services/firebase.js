import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB_gfdDDOL_9zLeTtJYhPb9gdIKLoMmpck",
    authDomain: "flight-status-c32a4.firebaseapp.com",
    projectId: "flight-status-c32a4",
    storageBucket: "flight-status-c32a4.appspot.com",
    messagingSenderId: "950712525093",
    appId: "1:950712525093:web:342a99c88d8d5f5e213acc",
    measurementId: "G-VPCVXV1985"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, { vapidKey: 'BOZJnxD5FMq4n-27akRqbFQIYtm9X-3ZRcCRmKtdCGcrUVVGUHkHAQmuzbdrUvsyHRKpfZtpPU4s34Q2eXPmef4' });
            if (token) {
                console.log("FCM Token:", token);
                return token;
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        } else {
            console.error("Unable to get permission to notify.");
        }
    } catch (error) {
        console.error("An error occurred while retrieving token.", error);
    }
};

export const listenForMessages = (callback) => {
    onMessage(messaging, (payload) => {
        callback(payload);
    });
};
