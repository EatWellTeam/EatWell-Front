// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsHZz5keEPQsjFfXry3kWbjjjPQy0h-v8",
  authDomain: "eatwell-33741.firebaseapp.com",
  projectId: "eatwell-33741",
  storageBucket: "eatwell-33741.appspot.com",
  messagingSenderId: "825841703046",
  appId: "1:825841703046:web:a90543a678045832941907",
  measurementId: "G-LPC56JEZRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);