// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVHVWjYRuVi9V2cALs1LiFUsMUQ5IeZ8w",
  authDomain: "aurify-b5063.firebaseapp.com",
  projectId: "aurify-b5063",
  storageBucket: "aurify-b5063.firebasestorage.app",
  messagingSenderId: "40871614302",
  appId: "1:40871614302:web:0ffa2d7aad96553523e1cf",
  measurementId: "G-V9Q9922X7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
