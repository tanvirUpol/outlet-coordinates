// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZuS8Ry-DoTJDiFPJSsAPnWs6sMd5NgG8",
  authDomain: "map-cord.firebaseapp.com",
  projectId: "map-cord",
  storageBucket: "map-cord.appspot.com",
  messagingSenderId: "912148565810",
  appId: "1:912148565810:web:eefe8b250b44232fe2112b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };