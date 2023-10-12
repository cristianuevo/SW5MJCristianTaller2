// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDogEEAkIx6DAvHoJoW-IvEfpeqiLKw2Xc",
  authDomain: "appgymfull.firebaseapp.com",
  projectId: "appgymfull",
  storageBucket: "appgymfull.appspot.com",
  messagingSenderId: "16995245233",
  appId: "1:16995245233:web:d4af9428301e09f3981690",
  measurementId: "G-WZ7X9TX6CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;