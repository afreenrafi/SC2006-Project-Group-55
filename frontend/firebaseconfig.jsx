import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvHL9K1rSQMwnNtWNRVcpH_-xn-PEGc6s",
  authDomain: "r3leaf.firebaseapp.com",
  projectId: "r3leaf",
  storageBucket: "r3leaf.appspot.com",
  messagingSenderId: "800066220121",
  appId: "1:800066220121:web:871fe98457e0e1320f0148",
  measurementId: "G-9100RGYB69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const firebase_app = app;
export const firebase_auth = auth;
export const firebase_db = getFirestore(app);
