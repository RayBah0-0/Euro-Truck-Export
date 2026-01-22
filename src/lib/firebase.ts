import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlOoQ7UWP7DEAmpA5SQblR-907H1lIo6Q",
  authDomain: "euro-truck-export.firebaseapp.com",
  projectId: "euro-truck-export",
  storageBucket: "euro-truck-export.firebasestorage.app",
  messagingSenderId: "963281007765",
  appId: "1:963281007765:web:5940d8a10a44f8a296979c",
  measurementId: "G-YD6BCXGCEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
