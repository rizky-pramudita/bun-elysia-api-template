import { initializeApp } from "firebase/app"; // Client SDK
import { getAuth } from "firebase/auth"; // Client SDK

// Client-side Firebase config (for frontend use)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase client-side (for frontend use)
const app = initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK with service account (for server-side use)
// Export initialized Firebase services
export const auth = getAuth(app); // Firebase client-side auth (for frontend)
