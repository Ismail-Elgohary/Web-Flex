import { Banknote, CheckCircle2, CreditCard } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useCart } from '../context/CartContext';
import { type Product } from '../lib/data';

export const Checkout = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const { cart, clearCart } = useCart();
 const product = location.state?.product as Product | undefined;

 const [paymentMethod, setPaymentMethod] = useState<'cash'>('cash');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const [formData, setFormData] = useState({
  firstName: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  city: '',
  phone: '',
  email: '',
  saveInfo: false
 });

 const [showErrors, setShowErrors] = useState(false);
 const [errors, setErrors] = useState<Record<string, string>>({});

 const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 };

 const handleNameChange = (field: 'firstName' | 'companyName', value: string) => {
  // Only allow letters and spaces
  if (/^[a-zA-Z\s]*$/.test(value)) {
   setFormData({ ...formData, [field]: value });
   if (errors[field]) {
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
   }
  }
 };

 const handlePhoneChange = (value: string) => {
  // Only allow numbers
  if (/^[0-9]*$/.test(value)) {
   setFormData({ ...formData, phone: value });
   if (errors.phone) {
    const newErrors = { ...errors };
    delete newErrors.phone;
    setErrors(newErrors);
   }
  }
 };

 const checkoutItems = product ? [{ ...product, quantity: 1 }] : cart;
 const subtotal = checkoutItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

 useEffect(() => {
  const timer = setTimeout(() => {
   if (!product && cart.length === 0) {
    navigate('/');
   }
  }, 60000);

  window.scrollTo(0, 0);

  return () => clearTimeout(timer);
 }, [product, cart, navigate]);



 const validate = () => {
  const newErrors: Record<string, string> = {};
  if (!formData.firstName) newErrors.firstName = 'First name is required';
  else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) newErrors.firstName = 'Enter a valid name';

  if (formData.companyName && !/^[a-zA-Z\s]+$/.test(formData.companyName)) {
   newErrors.companyName = 'Enter a valid company name';
  }

  if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required';
  if (!formData.city) newErrors.city = 'Town/City is required';

  if (!formData.phone) newErrors.phone = 'Phone number is required';
  else if (!/^[0-9]+$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number';

  if (!formData.email) newErrors.email = 'Email address is required';
  else if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setShowErrors(true);
  if (validate()) {
   setIsSubmitting(true);
   setTimeout(() => {
    setIsSubmitting(false);
    setIsSuccess(true);
    if (!product) {
     clearCart();
    }
   }, 1500);
  }
 };

 if (isSuccess) {
  return (
   <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-grow flex items-center justify-center p-4">
     <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
     >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
       <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h2>
      <p className="text-gray-600 mb-8">
       Your order has been placed and will arrive within approximately five days.
      </p>
      <Link
       to="/"
       className="inline-block bg-[#1443C3] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
      >
       Back to Shopping
      </Link>
     </motion.div>
    </main>
    <Footer />
   </div>
  );
 }

 if (!product && cart.length === 0) return null;

 return (
  <div className="min-h-screen flex flex-col bg-white">
   <Header />

   <main className="flex-grow py-16">
    <div className="container mx-auto px-4 max-w-6xl">
     <h1 className="text-4xl font-bold mb-12 text-black">Billing Details</h1>

     <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-20" noValidate>
      {/* Left Side - Form */}
      <div className="lg:w-[55%] space-y-6">
       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">First Name<span className="text-red-500">*</span></label>
        <input
         type="text"
         className={`w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${showErrors && errors.firstName ? 'ring-1 ring-red-500' : ''}`}
         value={formData.firstName}
         onChange={(e) => handleNameChange('firstName', e.target.value)}
        />
        {showErrors && errors.firstName && <span className="text-red-500 text-[10px] ml-1">{errors.firstName}</span>}
       </div>

       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">Company Name</label>
        <input
         type="text"
         className={`w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${showErrors && errors.companyName ? 'ring-1 ring-red-500' : ''}`}
         value={formData.companyName}
         onChange={(e) => handleNameChange('companyName', e.target.value)}
        />
        {showErrors && errors.companyName && <span className="text-red-500 text-[10px] ml-1">{errors.companyName}</span>}
       </div>

       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">Street Address<span className="text-red-500">*</span></label>
        <input
         type="text"
         className={`w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${showErrors && errors.streetAddress ? 'ring-1 ring-red-500' : ''}`}
         value={formData.streetAddress}
         onChange={(e) => {
          setFormData({ ...formData, streetAddress: e.target.value });
          if (errors.streetAddress) {
           const newErrors = { ...errors };
           delete newErrors.streetAddress;
           setErrors(newErrors);
          }
         }}
        />
        {showErrors && errors.streetAddress && <span className="text-red-500 text-[10px] ml-1">{errors.streetAddress}</span>}
       </div>

       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">Apartment, floor, etc. (optional)</label>
        <input
         type="text"
         className="w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
         value={formData.apartment}
         onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
        />
       </div>

       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">Town/City<span className="text-red-500">*</span></label>
        <input
         type="text"
         className={`w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${showErrors && errors.city ? 'ring-1 ring-red-500' : ''}`}
         value={formData.city}
         onChange={(e) => {
          setFormData({ ...formData, city: e.target.value });
          if (errors.city) {
           const newErrors = { ...errors };
           delete newErrors.city;
           setErrors(newErrors);
          }
         }}
        />
        {showErrors && errors.city && <span className="text-red-500 text-[10px] ml-1">{errors.city}</span>}
       </div>

       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">Phone Number<span className="text-red-500">*</span></label>
        <input
         type="tel"
         className={`w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${showErrors && errors.phone ? 'ring-1 ring-red-500' : ''}`}
         value={formData.phone}
         onChange={(e) => handlePhoneChange(e.target.value)}
        />
        {showErrors && errors.phone && <span className="text-red-500 text-[10px] ml-1">{errors.phone}</span>}
       </div>

       <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">Email Address<span className="text-red-500">*</span></label>
        <input
         type="email"
         className={`w-full bg-[#F5F5F5] border-none rounded-sm px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${showErrors && errors.email ? 'ring-1 ring-red-500' : ''}`}
         value={formData.email}
         onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (errors.email) {
           const newErrors = { ...errors };
           delete newErrors.email;
           setErrors(newErrors);
          }
         }}
        />
        {showErrors && errors.email && <span className="text-red-500 text-[10px] ml-1">{errors.email}</span>}
       </div>

       <div className="flex items-center gap-3 pt-4">
        <input
         type="checkbox"
         id="saveInfo"
         className="w-4 h-4 accent-[#1443C3] border-gray-300 rounded-sm"
         checked={formData.saveInfo}
         onChange={(e) => setFormData({ ...formData, saveInfo: e.target.checked })}
        />
        <label htmlFor="saveInfo" className="text-sm font-medium text-black">Save this information for faster check-out next time</label>
       </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="lg:w-[40%]">
       <div className="space-y-6 mb-8">
        {checkoutItems.map((item) => (
         <div key={item.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
           <div className="w-20 h-20 bg-[#F5F5F5] rounded-md p-3 flex items-center justify-center overflow-hidden group/item border border-gray-50">
            <img
             src={item.image}
             alt={item.name}
             className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/item:scale-110"
             referrerPolicy="no-referrer"
            />
           </div>
           <span className="text-sm font-medium text-black truncate max-w-37.5">{item.name}</span>
          </div>
          <span className="text-sm font-medium text-black">${item.price} x {item.quantity || 1}</span>
         </div>
        ))}

        <div className="space-y-4 pt-4 border-t border-gray-100">
         <div className="flex justify-between text-black text-sm">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
         </div>
         <div className="flex justify-between text-black text-sm">
          <span>Shipping:</span>
          <span className="text-green-600">Free</span>
         </div>
         <div className="flex justify-between text-base font-bold text-black pt-4 border-t border-gray-100">
          <span>Total:</span>
          <span>${subtotal}</span>
         </div>
        </div>
       </div>

       {/* Payment Methods */}
       <div className="space-y-6 mb-10">
        <div
         className="flex items-center gap-4 cursor-pointer"
         onClick={() => setPaymentMethod('cash')}
        >
         <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'cash' ? 'border-black' : 'border-gray-300'}`}>
          {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
         </div>
         <span className="text-sm font-medium text-black">Cash on Delivery</span>
        </div>
       </div>

       <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-[#1443C3] text-white px-12 py-3.5 rounded-md font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
       >
        {isSubmitting ? 'Processing...' : 'Place Order'}
       </button>
      </div>
     </form>
    </div>
   </main>

   <Footer />
  </div>
 );
};
