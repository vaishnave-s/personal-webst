export function firebaseauth(){
//Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyBm_uWn_TlojRuzuSzW9PREp5bjWmSOW-A",
    authDomain: "personal-webst.firebaseapp.com",
    databaseURL: "https://personal-webst.firebaseio.com",
    projectId: "personal-webst",
    storageBucket: "personal-webst.appspot.com",
    messagingSenderId: "222343428376",
    appId: "1:222343428376:web:5f92d20c8ef1e8a5afc66d",
    measurementId: "G-GDZ6GNV45N"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
}