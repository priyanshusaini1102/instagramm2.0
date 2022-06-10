// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR_FmzYgg0uOq3nA-MvxygZJBvOeyIEBE",
  authDomain: "instagramm2-0.firebaseapp.com",
  projectId: "instagramm2-0",
  storageBucket: "instagramm2-0.appspot.com",
  messagingSenderId: "158109941933",
  appId: "1:158109941933:web:35c0170a27a1be63590624",
  measurementId: "G-6Y4R5JDE6T"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };