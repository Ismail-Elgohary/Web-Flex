import { sendPasswordResetEmail } from 'firebase/auth';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import forgetL from '../Assets/Forgetleft.png';
import forgetR from '../Assets/forgetRight.png';
import logo from '../Assets/logo.png';

import { useToast } from '../context/ToastContext';
import { auth } from '../lib/firebase';
export const ForgotPassword = () => {
 const navigate = useNavigate();
 const { addToast } = useToast();
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const validateForm = () => {
  if (!email) {
   setError('Email is required');
   return false;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
   setError('Please enter a valid email address');
   return false;
  }
  return true;
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setError('');

  try {
   await sendPasswordResetEmail(auth, email);
   addToast('Check your email for reset instructions');
   setTimeout(() => navigate('/login'), 3000);
  } catch (err: any) {
   console.error('Reset password error:', err);
   let message = 'Failed to send reset email.';
   if (err.code === 'auth/user-not-found') message = 'No user found with this email.';
   setError(message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen bg-[#F5F2ED] flex flex-col">
   {/* Auth Header */}
   <header className="p-6 flex justify-between items-center">

    <Link to="/">
     <img src={logo} alt="FLX Logo" className="h-10 object-contain" />
    </Link>

    <div className="flex items-center gap-4">
     <button
      onClick={() => navigate('/login')}
      className="text-black px-8 py-2.5 rounded-full text-sm font-bold hover:bg-black/5 transition-all"
     >
      Sign in
     </button>
     <button
      onClick={() => navigate('/register')}
      className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-black/10 hover:scale-105 transition-all"
     >
      Register
     </button>
    </div>
   </header>

   <main className="flex-grow flex items-center justify-center relative px-4 overflow-hidden py-12">
    {/* Left Illustration */}
    <div className="hidden xl:block absolute left-20 top-1/2 -translate-y-1/2 w-[450px]">
     <motion.img
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      src={forgetL}
      alt="Style"
      className="w-full h-auto object-contain"
      referrerPolicy="no-referrer"
     />
    </div>

    {/* Auth Card */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     animate={{ opacity: 1, scale: 1 }}
     className="bg-white w-full max-w-[480px] rounded-[40px] p-10 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.08)] z-10 border border-white"
    >
     <div className="text-center mb-10">
      <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Recovery</h1>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">
       Enter your email address and we'll send<br />you instructions to reset your password
      </p>
     </div>

     <form className="space-y-8" onSubmit={handleSubmit}>
      {error && (
       <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold border border-red-100"
       >
        {error}
       </motion.div>
      )}
      <div className="space-y-1">
       <label className="text-[10px] font-black uppercase text-gray-400 ml-5 tracking-widest">Email Address</label>
       <input
        type="email"
        placeholder="email@example.com"
        className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-[#7DA2F3] outline-none transition-all font-medium"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
      </div>

      <button
       type="submit"
       disabled={loading}
       className="w-full bg-[#1443C3] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#1443C3]/30 hover:bg-blue-700 transition-all hover:-translate-y-1 disabled:opacity-50"
      >
       {loading ? 'Sending Request...' : 'Reset Password'}
      </button>

      <div className="text-center">
       <Link to="/login" className="text-sm text-gray-400 font-bold hover:text-[#1443C3] transition-colors">
        Back to Sign in
       </Link>
      </div>
     </form>
    </motion.div>

    {/* Right Illustration */}
    <div className="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 w-[450px]">
     <motion.img
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      src={forgetR}
      alt="Accessories"
      className="w-full h-auto object-contain"
      referrerPolicy="no-referrer"
     />
    </div>
   </main>
  </div>
 );
};
