import {
 createUserWithEmailAndPassword,
 GoogleAuthProvider,
 signInWithPopup,
 updateProfile
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import * as firestore from 'firebase/firestore';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import signUpLeft from '../Assets/SignUpLeft.png';
import signUpRight from '../Assets/signUpRight.png';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import * as firebase from '../lib/firebase';
import { auth, rtdb } from '../lib/firebase';


export const Register = () => {
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  role: 'customer'
 });

 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);

 const navigate = useNavigate();
 const { addToast } = useToast();
 const { isAuthenticated } = useAuth();

 React.useEffect(() => {
  if (isAuthenticated) navigate('/');
 }, [isAuthenticated, navigate]);

 const validateForm = () => {
  if (!formData.name.trim()) return setError('Name is required'), false;
  if (!formData.email) return setError('Email is required'), false;
  if (!/\S+@\S+\.\S+/.test(formData.email)) return setError('Invalid email'), false;
  if (!formData.password) return setError('Password is required'), false;
  if (formData.password.length < 6) return setError('Password must be at least 6 characters'), false;
  return true;
 };

 const handleSubmit = async (e: ChangeEvent) => {
  e.preventDefault()
  if (!validateForm()) return;

  setError('');
  setLoading(true);

  try {
   const userCredential = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
   );

   const date = new Date().toISOString();
   const user = userCredential.user;
   const storePath = `users/${user.uid}`;

   const userDoc = firestore.doc(firebase.db, storePath);
   await firestore.setDoc(userDoc, {
    id: user.uid,
    name: formData.name,
    email: formData.email,
    role: formData.role,
    createdAt: date,
   });

   await set(ref(rtdb, storePath), {
    uid: user.uid,
    name: formData.name,
    email: formData.email,
    role: formData.role,
    createdAt: date,
   });
   await updateProfile(user, {
    displayName: formData.name
   });

   addToast('Account created successfully');
   await navigate('/');
  } catch (err) {
   console.error('Register error:', err.message);
   setError('Something went wrong');
  } finally {
   setLoading(false);
  }
 };

 const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
   await signInWithPopup(auth, provider);
   addToast('Logged in with Google');
   await navigate('/');
  } catch {
   setError('Google sign-in failed');
  }
 };

 return (
  <div className="min-h-screen bg-[#F5F2ED] flex flex-col">

   {/* Header */}
   <header className="p-6 flex justify-between items-center">

    <Link to="/">
     <img src={logo} alt="FLX Logo" className="h-10 object-contain" />
    </Link>

    <div className="flex gap-4">
     <button onClick={() => navigate('/login')} className="px-6 py-2 text-sm font-bold">
      Sign in
     </button>
     <button onClick={() => navigate('/register')} className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold">
      Register
     </button>
    </div>
   </header>

   {/* Main */}
   <main className="grow flex items-center justify-center relative px-4 py-10 overflow-hidden">

    {/* Left image */}
    <div className="hidden xl:block absolute left-20 top-1/2 -translate-y-1/2 w-105">
     <motion.img
      src={signUpLeft}
      className="w-full h-auto object-contain"

     />
    </div>

    {/* Form */}
    <motion.div
     className="bg-white w-full max-w-120 rounded-[40px] p-10 shadow-2xl z-10"
    >
     <h1 className="text-3xl font-black text-center mb-6">Create Account</h1>

     {error && (
      <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-3">
       {error}
      </div>
     )}

     <form onSubmit={handleSubmit} className="space-y-4">

      <input
       placeholder="Name"
       className="w-full bg-gray-50 p-4 rounded-xl"
       value={formData.name}
       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
       placeholder="Email"
       className="w-full bg-gray-50 p-4 rounded-xl"
       value={formData.email}
       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <div className="relative">
       <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full bg-gray-50 p-4 rounded-xl"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
       />

       <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
       >
        {showPassword ? <EyeOff /> : <Eye />}
       </button>
      </div>

      <select
       className="w-full bg-gray-50 p-4 rounded-xl"
       value={formData.role}
       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
       <option value="customer">Customer</option>
       <option value="vendor">Vendor</option>
      </select>

      <button
       type="submit"
       disabled={loading}
       className="w-full bg-[#1443C3] text-white p-4 rounded-xl font-bold"
      >
       {loading ? 'Loading...' : 'Sign up'}
      </button>

      <button
       type="button"
       onClick={handleGoogleSignIn}
       className="w-full bg-gray-100 p-4 rounded-xl"
      >
       Continue with Google
      </button>

     </form>
    </motion.div>

    {/* Right image */}
    <div className="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 w-105">
     <motion.img
      src={signUpRight}
      className="w-full h-auto object-contain"

     />
    </div>

   </main>
  </div>
 );
};
