// Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw55RJGqT4LvRKKQGKWROWWgZWcGLb4CU",
  authDomain: "ga-project-hotel-app.firebaseapp.com",
  projectId: "ga-project-hotel-app",
  storageBucket: "ga-project-hotel-app.appspot.com",
  messagingSenderId: "182126905629",
  appId: "1:182126905629:web:a5b387dfa71b618ef639f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
