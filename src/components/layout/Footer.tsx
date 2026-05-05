import { Facebook, Instagram, Linkedin, Send, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
 return (
  <footer className="bg-black text-white pt-16 pb-6">
   <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
     {/* Exclusive */}
     <div className="col-span-1 md:col-span-1.5">
      <h3 className="text-2xl font-bold mb-6 italic tracking-wider">Exclusive</h3>
      <h4 className="text-lg font-medium mb-4">Subscribe</h4>
      <p className="text-sm mb-4 opacity-80">Get 10% off your first order</p>
      <div className="relative max-w-[220px]">
       <input
        type="email"
        placeholder="Enter your email"
        className="w-full bg-transparent border border-white/20 rounded py-2 pl-3 pr-10 text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/50 transition-colors"
       />
       <Send className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-indigo-400 transition-colors" />
      </div>
     </div>

     {/* Support */}
     <div>
      <h4 className="text-lg font-medium mb-6 underline underline-offset-8 decoration-indigo-500/50">Support</h4>
      <ul className="space-y-4 text-sm opacity-80">
       <li className="max-w-[180px]">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
       <li className="hover:text-indigo-400 transition-colors cursor-pointer text-xs">exclusive@gmail.com</li>
       <li className="hover:text-indigo-400 transition-colors cursor-pointer">+88015-88888-9999</li>
      </ul>
     </div>

     {/* Account */}
     <div>
      <h4 className="text-lg font-medium mb-6 underline underline-offset-8 decoration-indigo-500/50">Account</h4>
      <ul className="space-y-4 text-sm opacity-80">
       <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">My Account</Link></li>
       <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Login / Register</Link></li>
       <li><Link to="/cart" className="hover:text-indigo-400 transition-colors">Cart</Link></li>
       <li><Link to="/favorites" className="hover:text-indigo-400 transition-colors">Wishlist</Link></li>
       <li><Link to="/all-products" className="hover:text-indigo-400 transition-colors">Shop</Link></li>
      </ul>
     </div>

     {/* Quick Link */}
     <div>
      <h4 className="text-lg font-medium mb-6 underline underline-offset-8 decoration-indigo-500/50">Quick Link</h4>
      <ul className="space-y-4 text-sm opacity-80">
       <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
       <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
      </ul>
     </div>

     {/* Download App */}
     <div>
      <h4 className="text-lg font-medium mb-6 underline underline-offset-8 decoration-indigo-500/50">Download App</h4>
      <p className="text-xs opacity-70 mb-3">Save $3 with App New User Only</p>
      <div className="flex gap-2 items-center mb-6">
       {/* QR Code Placeholder */}
       <div className="w-20 h-20 bg-white p-1 rounded">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="QR" className="w-full h-full" />
       </div>
       <div className="flex flex-col gap-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity" />
       </div>
      </div>
      <div className="flex gap-6">
       <Facebook className="w-6 h-6 cursor-pointer hover:text-indigo-400 transition-all hover:scale-110" />
       <Twitter className="w-6 h-6 cursor-pointer hover:text-indigo-400 transition-all hover:scale-110" />
       <Instagram className="w-6 h-6 cursor-pointer hover:text-indigo-400 transition-all hover:scale-110" />
       <Linkedin className="w-6 h-6 cursor-pointer hover:text-indigo-400 transition-all hover:scale-110" />
      </div>
     </div>
    </div>

    <div className="border-t border-gray-800 pt-6 text-center text-sm opacity-40">
     <p>&copy; Copyright Rimel 2026. All right reserved</p>
    </div>
   </div>
  </footer>
 );
};
