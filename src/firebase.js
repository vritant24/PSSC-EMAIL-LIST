import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyA4dmvaQmpQ_9FK2WGP_JPOJpdovVSnFUw",
    authDomain: "pssc-email-list.firebaseapp.com",
    databaseURL: "https://pssc-email-list.firebaseio.com",
    projectId: "pssc-email-list",
    storageBucket: "pssc-email-list.appspot.com",
    messagingSenderId: "649206267815"
  };
firebase.initializeApp(config);
export default firebase;