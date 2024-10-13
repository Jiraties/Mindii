// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBefqZpjhGOJ-ip0-tNzytln0m4JutgluM",
  authDomain: "symptosense-8a2d8.firebaseapp.com",
  projectId: "symptosense-8a2d8",
  storageBucket: "symptosense-8a2d8.appspot.com",
  messagingSenderId: "292338656793",
  appId: "1:292338656793:web:0e77cc9cdbaaa2ed40ec88",
  measurementId: "G-9GKVGW663J",
};

// Initialize Firebase
export const FIREBASE = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE);
// const analytics = getAnalytics(FIREBASE);
