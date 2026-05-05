import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyABydUu63sPTiI5D8X4HhDigh1pVRYlUDI",
 authDomain: "flxmarket-6664b.firebaseapp.com",
 projectId: "flxmarket-6664b",
 storageBucket: "flxmarket-6664b.firebasestorage.app",
 messagingSenderId: "260559848797",
 appId: "1:260559848797:web:0b73bcb3254795b4e4d4b4",
 measurementId: "G-70JLJN6SCC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
