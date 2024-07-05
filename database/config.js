import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCMjgeaAKgCSu_qffWbZfLVS7FCwKld9bE",
    authDomain: "info-6132-lab-02-e60b9.firebaseapp.com",
    projectId: "info-6132-lab-02-e60b9",
    storageBucket: "info-6132-lab-02-e60b9.appspot.com",
    messagingSenderId: "288497078528",
    appId: "1:288497078528:web:9aa3e45cf81e9f53e823e5"
  };

export const FIREBASE_APP = initializeApp(FIREBASE_CONFIG);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
