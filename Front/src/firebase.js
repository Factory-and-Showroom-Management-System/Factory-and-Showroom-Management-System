// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{ getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ39nvvbWRuCcukQos38h3cvQr0JV_U0g",
  authDomain: "pfms-9be33.firebaseapp.com",
  projectId: "pfms-9be33",
  storageBucket: "pfms-9be33.appspot.com",
  messagingSenderId: "1055316103012",
  appId: "1:1055316103012:web:94ee9a3b579915da627471"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

