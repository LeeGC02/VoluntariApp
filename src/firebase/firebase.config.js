import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcOyUaPB4VrG_xjv_xDeH-oI-BZUd7T6I",
  authDomain: "voluntariapp-42cbd.firebaseapp.com",
  projectId: "voluntariapp-42cbd",
  storageBucket: "voluntariapp-42cbd.appspot.com",
  messagingSenderId: "597196619640",
  appId: "1:597196619640:web:dd73b308b137aa615c528d",
  measurementId: "G-6RBQNCXLML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);
// configuracion Firestore
export const db = getFirestore(app);