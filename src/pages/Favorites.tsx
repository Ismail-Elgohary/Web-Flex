import { Eye, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

export const Favorites = () => {
 const { favorites, toggleFavorite } = useFavorites();
 const { addToCart, isInCart } = useCart();
 const { addToast } = useToast();
 const navigate = useNavigate();

 const handleAddToCart = (product: any) => {
  addToCart(product);
  addToast('Added');
 };

 return (
  <div className="min-h-screen flex flex-col">
   <Header />
   <main className="flex-grow py-16">
    <div className="container mx-auto px-4">
     <div className="flex items-center justify-between mb-12">
      <h1 className="text-3xl font-bold text-black">My Favorites ({favorites.length})</h1>
      <Link to="/" className="text-[#1443C3] hover:underline font-medium">
       Continue Shopping
      </Link>
     </div>

     {favorites.length === 0 ? (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-10 h-10 text-gray-300" />
       </div>
       <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
       <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Save items you like to your wishlist. Review them anytime and easily move them to the cart.
       </p>
       <Link
        to="/"
        className="inline-flex items-center justify-center px-8 py-3 bg-[#1443C3] text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
       >
        Explore Products
       </Link>
      </div>
     ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
       <AnimatePresence mode="popLayout">
        {favorites.map((product) => (
         <motion.div
          key={product.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 relative"
         >
          <div className="relative bg-gray-50 rounded-xl p-6 mb-4 h-[240px] flex items-center justify-center overflow-hidden">
           <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
             onClick={() => toggleFavorite(product)}
             className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
             <Trash2 className="w-5 h-5" />
            </button>
            <button
             onClick={() => navigate(`/products/${product.id}`)}
             className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-black hover:bg-red-500 hover:text-white transition-all"
            >
             <Eye className="w-5 h-5" />
            </button>
           </div>
           <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
           />
          </div>

          <div className="space-y-3">
           <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 h-12 leading-tight">
             {product.name}
            </h3>
           </div>
           <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between">
             <span className="text-2xl font-bold text-[#1443C3]">${product.price}</span>
             <button
              onClick={() => handleAddToCart(product)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
             >
              <ShoppingCart className="w-4 h-4" />
              Add
             </button>
            </div>
            <button
             onClick={() => {
              navigate('/checkout');
             }}
             className="w-full bg-[#1443C3] text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
            >
             Buy Now
            </button>
           </div>
          </div>
         </motion.div>
        ))}
       </AnimatePresence>
      </div>
     )}
    </div>
   </main>
   <Footer />
  </div>
 );
};
