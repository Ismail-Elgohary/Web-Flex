import {
 deleteUser,
 User as FirebaseUser,
 onAuthStateChanged,
 signOut
} from 'firebase/auth';
import { get, ref, remove, set } from 'firebase/database';
import * as firestore from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from '../lib/firebase';
import { auth, rtdb } from '../lib/firebase';

interface User {
 uid: string;
 name: string;
 email: string;
 phone?: string;
 role: 'vendor' | 'customer';
 avatar?: string;
}

interface AuthContextType {
 user: User | null;
 loading: boolean;
 logout: () => void;
 updateUser: (data: Partial<User>) => Promise<void>;
 deleteAccount: () => Promise<void>;
 isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [user, setUser] = useState<User | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  // Safety timeout: if Firebase doesn't respond in 4 seconds, stop loading
  const safetyTimeout = setTimeout(() => {
   setLoading(false);
  }, 4000);

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
   clearTimeout(safetyTimeout);
   try {
    if (firebaseUser) {
     // Immediately set basic user info so UI updates instantly
     const basicUser: User = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      role: 'customer'
     };
     setUser(basicUser);

     // Attempt to enrich with database profile
     try {
      const userDoc = firestore.doc(firebase.db, `users/${firebaseUser.uid}`);
      const snapshot = await firestore.getDoc(userDoc);

      if (snapshot.exists()) {
       const val = snapshot.data();
       setUser({
        ...basicUser,
        name: val.name,
        email: val.email,
       });
      } else {
       // Create a default user profile in DB if it doesn't exist
       await firestore.setDoc(userDoc, basicUser);
      }
     } catch (dbError) {
      console.error('Database profile fetch error:', dbError);
      // Keep the basicUser so they remain authenticated
     }
    } else {
     setUser(null);
    }
   } catch (error) {
    console.error('Auth state change error:', error);
    setUser(null);
   } finally {
    setLoading(false);
   }
  });

  return () => unsubscribe();
 }, []);

 const logout = async () => {
  try {
   await signOut(auth);
   localStorage.removeItem("favorites");
   window.location.reload();
  } catch (error) {
   console.error('Logout error:', error);
  }
 };

 const updateUser = async (data: Partial<User>) => {
  if (!user) return;
  const userRef = ref(rtdb, `users/${user.uid}`);
  const updatedUser = { ...user, ...data };
  await set(userRef, updatedUser);
  setUser(updatedUser);
 };

 const deleteAccount = async () => {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser || !user) return;

  try {
   // 1. Delete data from Realtime Database
   const userRef = ref(rtdb, `users/${user.uid}`);
   await remove(userRef);

   // 2. Delete the user from Firebase Auth
   await deleteUser(firebaseUser);

   setUser(null);
  } catch (error) {
   console.error('Delete account error:', error);
   throw error;
  }
 };

 const isAuthenticated = !!user;

 return (
  <AuthContext.Provider value={{ user, loading, logout, updateUser, deleteAccount, isAuthenticated }}>
   {loading ? (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-999">
     <div className="w-16 h-16 border-4 border-gray-100 border-t-[#1443C3] rounded-full animate-spin mb-4" />
     <p className="text-gray-400 font-bold text-sm uppercase tracking-widest animate-pulse">Initializing Security...</p>
    </div>
   ) : (
    children
   )}
  </AuthContext.Provider>
 );
};

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (context === undefined) {
  throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
};
