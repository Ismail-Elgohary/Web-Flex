import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useCart } from '../context/CartContext';

export const Cart = () => {
 const { cart, removeFromCart, addToCart, updateQuantity, clearCart, cartCount } = useCart();
 const navigate = useNavigate();

 const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

 return (
  <div className="min-h-screen bg-white flex flex-col">
   <Header />

   <main className="flex-grow py-16">
    <div className="max-w-[95%] mx-auto px-4">
     <div className="flex items-center gap-2 text-lg text-indigo-500 mb-10">
      <Link to="/" className="hover:text-black transition-colors">Home</Link>
      <span>/</span>
      <span className="text-red-500">Cart</span>
     </div>

     <h1 className="text-3xl font-bold mb-10">Your Cart ({cartCount} items)</h1>

     {cart.length === 0 ? (
      <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
       <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
       <h2 className="text-xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
       <Link
        to="/"
        className="inline-block bg-[#1443C3] text-white px-10 py-4 rounded-md font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
       >
        Continue Shopping
       </Link>
      </div>
     ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
       {/* Cart Items List */}
       <div className="lg:col-span-2 space-y-6">
        <div className="hidden md:grid grid-cols-4 pb-4 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
         <div className="col-span-2">Product</div>
         <div>Price</div>
         <div className="text-center md:text-left">Quantity</div>
        </div>

        {cart.map((item) => (
         <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 pb-6 border-b border-gray-100 group transition-all hover:bg-gray-50/50 p-2 rounded-lg">
          <div className="col-span-2 flex items-center gap-4">
           <div className="w-24 h-24 bg-white border border-gray-100 rounded-md flex-shrink-0 flex items-center justify-center p-2 shadow-sm">
            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
           </div>
           <div className="flex-grow min-w-0">
            <h3 className="font-bold text-base md:text-md mb-1">{item.name}</h3>
            <button
             onClick={() => removeFromCart(item.id)}
             className="text-red-500 text-sm font-medium flex items-center gap-1.5 hover:text-red-600 transition-colors"
            >
             <Trash2 className="w-5 h-5" />
             <span>Remove</span>
            </button>
           </div>
          </div>

          <div className="font-bold text-lg text-black">
           ${item.price}
          </div>

          <div className="flex items-center gap-3">
           <div className="flex items-center border-2 border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
             className="p-3 hover:bg-gray-50 transition-colors text-gray-600 flex items-center justify-center h-12 w-12"
             onClick={() => updateQuantity(item.id, item.quantity - 1)}
             title="Decrease quantity"
            >
             <Minus className="w-5 h-5" />
            </button>
            <span className="w-10 text-center text-base font-bold text-black border-x border-gray-100 flex items-center justify-center h-12">{item.quantity}</span>
            <button
             className="p-3 hover:bg-gray-50 transition-colors text-gray-600 flex items-center justify-center h-12 w-12"
             onClick={() => updateQuantity(item.id, item.quantity + 1)}
             title="Increase quantity"
            >
             <Plus className="w-5 h-5" />
            </button>
           </div>
          </div>
         </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
         <Link
          to="/"
          className="flex-1 sm:flex-none inline-flex items-center justify-center border-2 border-black px-10 py-4 rounded-md font-bold hover:bg-black hover:text-white transition-all text-center"
         >
          Return To Shop
         </Link>
         <button
          onClick={() => clearCart()}
          className="flex-1 sm:flex-none inline-flex items-center justify-center border-2 border-black px-10 py-4 rounded-md font-bold hover:bg-black hover:text-white transition-all text-center sm:ml-auto"
         >
          Clear Cart
         </button>
        </div>
       </div>

       {/* Order Summary */}
       <div className="lg:col-span-1">
        <div className="border-2 border-black p-8 rounded-lg shadow-sm">
         <h2 className="text-2xl font-bold mb-8">Cart Total</h2>

         <div className="space-y-6 mb-8">
          <div className="flex justify-between pb-4 border-b border-gray-100 text-lg">
           <span className="text-gray-500">Subtotal:</span>
           <span className="font-bold text-black">${subtotal}</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-100 text-lg">
           <span className="text-gray-500">Shipping:</span>
           <span className="text-green-600 font-bold">Free</span>
          </div>
          <div className="flex justify-between text-2xl font-black">
           <span className="text-black">Total:</span>
           <span className="text-[#1443C3]">${subtotal}</span>
          </div>
         </div>

         <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-[#1443C3] text-white py-5 rounded-md font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
         >
          Process to Checkout
         </button>
        </div>
       </div>
      </div>
     )}
    </div>
   </main>

   <Footer />
  </div>
 );
};
