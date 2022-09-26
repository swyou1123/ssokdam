// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrP9iL9gdKog7LUS2_ebLpnZpOWX_iAQ8",
    authDomain: "ssokdam-e2b32.firebaseapp.com",
    projectId: "ssokdam-e2b32",
    storageBucket: "ssokdam-e2b32.appspot.com",
    messagingSenderId: "938579641940",
    appId: "1:938579641940:web:30854b425b003520c50fc1",
    measurementId: "G-L9TYH9KS9L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

var auth_obj = firebase.auth();
var storage_obj = firebase.storage();

export default firebase;
export const auth = auth_obj;
export const storage = storage_obj;
