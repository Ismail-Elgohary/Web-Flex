import {
 GoogleAuthProvider,
 signInWithEmailAndPassword,
 signInWithPopup
} from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import signIn from '../Assets/SigninRight.png';
import signup from '../Assets/SignUpLeft.png';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { auth } from '../lib/firebase';

export const Login = () => {
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({ email: '', password: '' });
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const { addToast } = useToast();
 const { isAuthenticated } = useAuth();

 React.useEffect(() => {
  if (isAuthenticated) {
   navigate('/');
  }
 }, [isAuthenticated, navigate]);

 const validateForm = () => {
  if (!formData.email) {
   setError('Email is required');
   return false;
  }
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
   setError('Please enter a valid email address');
   return false;
  }
  if (!formData.password) {
   setError('Password is required');
   return false;
  }
  if (formData.password.length < 6) {
   setError('Password must be at least 6 characters');
   return false;
  }
  return true;
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setError('');
  setLoading(true);

  // use  firebase Login
  try {
   await signInWithEmailAndPassword(auth, formData.email, formData.password);
   addToast('Welcome back! Login successful');
   navigate('/');
  } catch (err: any) {
   console.error('Login error:', err);
   let message = 'Failed to sign in. Please check your credentials.';
   if (err.code === 'auth/user-not-found') message = 'No account found with this email.';
   if (err.code === 'auth/wrong-password') message = 'Incorrect password.';
   setError(message);
  } finally {
   setLoading(false);
  }
 };

 // use google login
 const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
   await signInWithPopup(auth, provider);
   addToast('Signed in with Google successfully');
   navigate('/');
  } catch (err: any) {
   console.error('Google Sign-in error:', err);
   setError('Failed to sign in with Google. Please try again.');
  }
 };

 return (
  <div className="min-h-screen bg-[#F5F2ED] flex flex-col">
   <header className="p-6 flex justify-between items-center">

    <Link to="/">
     <img src={logo} alt="FLX Logo" className="h-10 object-contain" />
    </Link>

    <div className="flex items-center gap-4">
     <button
      onClick={() => navigate('/login')}
      className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-black/10 hover:scale-105 transition-all"
     >
      Sign in
     </button>
     <button
      onClick={() => navigate('/register')}
      className="text-black px-8 py-2.5 rounded-full text-sm font-bold hover:bg-black/5 transition-all"
     >
      Register
     </button>
    </div>
   </header>

   <main className="grow flex items-center justify-center relative px-4 overflow-hidden py-12">
    <div className="hidden xl:block absolute left-20 top-1/2 -translate-y-1/2 w-112.5">
     <motion.img
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      src={signup}
      alt="Fashion Shopping"
      className="w-full h-auto object-contain transform scale-x-[-1]"
      referrerPolicy="no-referrer"
     />
    </div>

    {/* Auth Card */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     animate={{ opacity: 1, scale: 1 }}
     className="bg-white w-full max-w-120 rounded-[40px] p-10 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.08)] z-10 border border-white"
    >
     <div className="text-center mb-10">
      <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Welcome Back</h1>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">
       Enter your credentials to access your<br />premium shopping experience
      </p>
     </div>

     <form className="space-y-6" onSubmit={handleSubmit}>
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
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
       />
      </div>

      <div className="space-y-1 relative">
       <label className="text-[10px] font-black uppercase text-gray-400 ml-5 tracking-widest">Password</label>
       <div className="relative">
        <input
         type={showPassword ? "text" : "password"}
         placeholder="••••••••"
         className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-[#7DA2F3] outline-none transition-all font-medium"
         value={formData.password}
         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button
         type="button"
         onClick={() => setShowPassword(!showPassword)}
         className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1443C3] transition-colors"
        >
         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
       </div>
      </div>

      <div className="flex justify-end pr-2">
       <Link to="/forgot-password" size="sm" className="text-[#1443C3] text-xs font-bold hover:underline transition-all">
        Forgot Password?
       </Link>
      </div>

      <button
       type="submit"
       disabled={loading}
       className="w-full bg-[#1443C3] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#1443C3]/30 hover:bg-blue-700 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
       {loading ? 'Authenticating...' : 'Sign in'}
      </button>

      <div className="relative flex items-center gap-4 py-2">
       <div className="grow h-px bg-gray-100"></div>
       <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Or Secure Login</span>
       <div className="grow h-px bg-gray-100"></div>
      </div>

      <button
       type="button"
       onClick={handleGoogleSignIn}
       className="w-full bg-white text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border-2 border-gray-50 hover:border-[#7DA2F3] hover:bg-blue-50/30 transition-all"
      >
       <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
       <span className="text-sm">Continue with Google</span>
      </button>
     </form>

     <p className="mt-8 text-center text-sm text-gray-500 font-medium">
      Don't have an account? {' '}
      <Link to="/register" className="text-[#1443C3] font-bold hover:underline">
       Create Account
      </Link>
     </p>
    </motion.div>

    {/* Right Illustration */}
    <div className="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 w-112.5">
     <motion.img
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      src={signIn}
      alt="Storefront"
      className="w-full h-auto object-contain transform scale-x-[-1]"
      referrerPolicy="no-referrer"
     />
    </div>
   </main>
  </div>
 );
};
