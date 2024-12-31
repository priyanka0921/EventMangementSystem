// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoHY1rAJBiJ0x4JJXVDQuEz40roh45mIQ",
  authDomain: "eventmangement-281224.firebaseapp.com",
  projectId: "eventmangement-281224",
  storageBucket: "eventmangement-281224.firebasestorage.app",
  messagingSenderId: "705713063491",
  appId: "1:705713063491:web:893d3439f456bade83f6f6",
  measurementId: "G-FM3ZMLK646"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
