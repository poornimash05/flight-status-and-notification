
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyB_gfdDDOL_9zLeTtJYhPb9gdIKLoMmpck",
    authDomain: "flight-status-c32a4.firebaseapp.com",
    projectId: "flight-status-c32a4",
    storageBucket: "flight-status-c32a4.appspot.com",
    messagingSenderId: "950712525093",
    appId: "1:950712525093:web:342a99c88d8d5f5e213acc",
    measurementId: "G-VPCVXV1985"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Message received. ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
