import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCR-zuUwRKWMQmugoI8IjpWhXMf9F56rBY",
  authDomain: "we-chat-42db0.firebaseapp.com",
  projectId: "we-chat-42db0",
  storageBucket: "we-chat-42db0.appspot.com",
  messagingSenderId: "501000691084",
  appId: "1:501000691084:web:18bc691be63bd0341e0aa9",
  measurementId: "G-VEPLLST3GE"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialising databse
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const linkedInProvider = new firebase.auth.OAuthProvider('linkedin.com');
export { db, auth, storage,googleProvider,facebookProvider,linkedInProvider };
