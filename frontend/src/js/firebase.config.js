// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/firestore";

/*
given data describing organizations that take donations,
create an array of Marker components for each organization
*/
const firebaseConfig = {
  apiKey: "AIzaSyCRHyCwfXLVsKu3B9CJzUz6-_zDwUTi-SM",
  authDomain: "donationstation-9a393.firebaseapp.com",
  projectId: "donationstation-9a393",
  storageBucket: "donationstation-9a393.appspot.com",
  messagingSenderId: "919292423824",
  appId: "1:919292423824:web:f1bce93f2bb937036b3215"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db
