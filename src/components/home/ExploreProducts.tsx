import { useAuth } from '@/src/context/AuthContext';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { products } from '../../lib/data';

const EXPLORE_PRODUCTS = products.filter((product) => product.section === "explore").slice(0, 8);

export const ExploreProducts = () => {
 const { isAuthenticated } = useAuth();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { addToCart, removeFromCart, isInCart } = useCart();
 const { addToast } = useToast();
 const navigate = useNavigate();
 const scrollContainerRef = useRef<HTMLDivElement>(null);

 const handleToggleFavorite = (product: any) => {
  if (!isAuthenticated) {
   addToast('You have to login to favorite products');
   return;
  }
  const wasFavorite = isFavorite(product.id);
  toggleFavorite(product);
  if (!wasFavorite) {
   addToast('Added to favorites');
  } else {
   addToast('Removed from favorites');
  }
 };

 const handleToggleCart = (product: any) => {
  if (!isAuthenticated) {
   addToast('You have to login to show cart page');
   return;
  }
  if (isInCart(product.id)) {
   removeFromCart(product.id);
   addToast('Removed from cart');
  } else {
   addToCart(product);
   addToast('Added to cart');
  }
 };

 return (
  <section className="py-4 mb-8">
   <div className="max-w-[85%] mx-auto  relative">
    <div className="mb-8">
     <div className="flex items-center gap-4 mb-4">
      <div className="w-5 h-10 bg-[#1443C3] rounded-sm"></div>
      <span className="text-[#1443C3] font-bold">Our Products</span>
     </div>

     <div className="flex items-center justify-between">
      <h2 className="text-3xl md:text-4xl font-bold text-black">Explore Our Products</h2>
      <button
       onClick={() => navigate('/categories')}
       className="bg-[#1443C3] text-white px-10 py-3.5 rounded-md font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 ml-2 hidden md:block"
      >
       View All
      </button>
     </div>
    </div>

    <div className="relative group/section">

     <div
      ref={scrollContainerRef}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
     >
      {EXPLORE_PRODUCTS.map((product) => (
       <div key={product.id} className="group flex flex-col bg-white p-2 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100">
        <div
         className="relative bg-[#F5F5F5] rounded-lg mb-2 h-[180px] sm:h-[200px] flex items-center justify-center overflow-hidden transition-all duration-300"
        >
         <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
         />

         <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
           onClick={(e) => { e.stopPropagation(); handleToggleFavorite(product); }}
           className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${isFavorite(product.id)
            ? 'bg-[#1443C3] text-white'
            : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
            }`}
          >
           <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
           onClick={(e) => { e.stopPropagation(); handleToggleCart(product); }}
           className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${isInCart(product.id)
            ? 'bg-[#1443C3] text-white'
            : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
            }`}
          >
           <ShoppingCart className="w-4 h-4" />
          </button>
          <button
           onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
           className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#1443C3] hover:text-white transition-all shadow-md"
          >
           <Eye className="w-4 h-4" />
          </button>
         </div>

         {/* Buy Now Button Bar */}
         <button
          onClick={() => {
           if (!isInCart(product.id)) {
            addToCart(product);
           }
           navigate('/cart');
          }}
          className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-xs font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1 hover:bg-gray-900"
         >
          <ShoppingCart className="w-3 h-3" />
          Buy Now
         </button>
        </div>

        <div className="px-1 flex flex-col flex-grow">
         <h3 className="font-semibold text-sm mb-1 text-[#1a1a1a] group-hover:text-[#1443C3] transition-colors truncate">{product.name}</h3>
         <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.description}</p>
         <div className="mt-auto flex items-center justify-between">
         </div>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </section>
 );
};

