
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDpiSxgCrgOeKlLlQZi6B-TeAw0EjT95rw",
  authDomain: "ecommerce-c89f8.firebaseapp.com",
  projectId: "ecommerce-c89f8",
  storageBucket: "ecommerce-c89f8.appspot.com",
  messagingSenderId: "225164226413",
  appId: "1:225164226413:web:5fdeb6c2c1469f49823464"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)