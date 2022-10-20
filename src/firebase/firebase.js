import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDYiigtUj8vbDlup8E0ccoK6Ig7STCy-6Q",

  authDomain: "foodify-70c0c.firebaseapp.com",

  projectId: "foodify-70c0c",

  storageBucket: "foodify-70c0c.appspot.com",

  messagingSenderId: "302482846851",

  appId: "1:302482846851:web:979ca5bc544510698d97b6",

  measurementId: "G-9Z1WYG78LX"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app)