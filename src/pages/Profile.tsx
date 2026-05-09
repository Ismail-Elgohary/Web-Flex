import { LogOut, Mail, Save, Shield, Trash2, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Profile = () => {
 const { user, updateUser, logout, deleteAccount, isAuthenticated } = useAuth();
 const navigate = useNavigate();
 const { addToast } = useToast();

 const [formData, setFormData] = useState({
  name: '',
  email: '',
  role: 'customer' as 'vendor' | 'customer'
 });

 const [isEditing, setIsEditing] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  if (!isAuthenticated) {
   navigate('/login');
  } else if (user) {
   setFormData({
    name: user.name,
    email: user.email,
    role: user.role
   });
  }
 }, [user, isAuthenticated, navigate]);

 const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSaving(true);
  try {
   await updateUser(formData);
   setIsEditing(false);
   addToast('Profile updated successfully');
  } catch (error) {
   console.error('Update error:', error);
   addToast('Failed to update profile. Please try again.', 'error');
  } finally {
   setIsSaving(false);
  }
 };

 const handleLogout = () => {
  logout();
  navigate('/');
  addToast('Logged out successfully');
 };

 const handleDeleteAccount = async () => {
  setIsDeleting(true);
  try {
   await deleteAccount();
   addToast('Account deleted successfully');
   navigate('/');
  } catch (error: any) {
   console.error('Error deleting account:', error);
   if (error.code === 'auth/requires-recent-login') {
    addToast('Please log out and log in again to delete your account for security reasons.', 'error');
   } else {
    addToast('Failed to delete account. Please try again.', 'error');
   }
  } finally {
   setIsDeleting(false);
   setShowDeleteModal(false);
  }
 };

 if (!user) return null;

 return (
  <div className="min-h-screen flex flex-col bg-gray-50">
   <Header />

   <main className="flex-grow py-16">
    <div className="container mx-auto px-4">
     {/* Breadcrumbs */}
     <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
      <Link to="/" className="hover:text-black">Home</Link>
      <span>/</span>
      <span className="text-black font-medium">My Profile</span>
     </nav>

     <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
       <div className="p-8 md:p-12">
        <div className="flex flex-col items-center mb-12">
         <div className="w-24 h-24 bg-[#7DA2F3] rounded-full flex items-center justify-center text-white text-4xl font-black mb-6 shadow-xl shadow-blue-100">
          {user.name.charAt(0)}
         </div>
         <h1 className="text-3xl font-black text-gray-900 text-center">{user.name}</h1>
         <p className="text-[#1443C3] font-bold text-sm uppercase tracking-widest mt-2">{user.role} Account</p>
        </div>

        <div className="space-y-6">
         <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
           <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest flex items-center gap-2">
            <User className="w-3 h-3" />
            Full Name
           </label>
           <input
            type="text"
            disabled={!isEditing}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-[#7DA2F3] outline-none transition-all disabled:opacity-50"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           />
          </div>

          <div className="space-y-2">
           <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest flex items-center gap-2">
            <Mail className="w-3 h-3" />
            Email Address
           </label>
           <input
            type="email"
            disabled={!isEditing}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-[#7DA2F3] outline-none transition-all disabled:opacity-50"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           />
          </div>

          <div className="space-y-2">
           <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Account Type
           </label>
           <select
            disabled={!isEditing}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-[#7DA2F3] outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'vendor' | 'customer' })}
           >
            <option value="customer">Customer</option>
           </select>
          </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
          <button
           onClick={handleLogout}
           className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-black text-sm hover:border-gray-200 transition-all flex items-center justify-center gap-2"
          >
           <LogOut className="w-4 h-4" />
           Logout
          </button>
          <button
           onClick={() => setShowDeleteModal(true)}
           className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
          >
           <Trash2 className="w-4 h-4" />
           Delete Account
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </main >

   <AnimatePresence>
    {showDeleteModal && (
     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="absolute inset-0 bg-black/40 backdrop-blur-sm"
       onClick={() => !isDeleting && setShowDeleteModal(false)}
      />
      <motion.div
       initial={{ opacity: 0, scale: 0.9, y: 20 }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.9, y: 20 }}
       className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center"
      >
       <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <X className="w-8 h-8" />
       </div>
       <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h3>
       <p className="text-gray-500 mb-8">This action is permanent and cannot be undone. All your data will be removed.</p>
       <div className="flex gap-3">
        <button
         disabled={isDeleting}
         onClick={() => setShowDeleteModal(false)}
         className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50"
        >
         Cancel
        </button>
        <button
         disabled={isDeleting}
         onClick={handleDeleteAccount}
         className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50"
        >
         {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
       </div>
      </motion.div>
     </div>
    )}
   </AnimatePresence>

   <Footer />
  </div >
 );
};
