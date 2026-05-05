import { useAuth } from '@/src/context/AuthContext';
import {
 Eye,
 Heart,
 ShoppingCart,
} from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { products, type Product } from '../../lib/data';

const POPULAR_PRODUCTS: Product[] = products.filter((p) => p.section === "popular").slice(0, 12);

export const Categories = () => {
 const { isAuthenticated } = useAuth();
 const navigate = useNavigate();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { addToCart, removeFromCart, isInCart } = useCart();
 const { addToast } = useToast();
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
  <section className="py-16">
   <div className="max-w-[95%] mx-auto px-12 relative">
    <div className="flex items-center justify-between mb-10 px-4">
     <div className="flex items-center gap-4">
      <div className="w-5 h-10 bg-[#1443C3] rounded-sm"></div>
      <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a]">Popular Products</h2>
     </div>

    </div>

    <div className="relative group/section">

     <div
      ref={scrollContainerRef}
      className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-8 pt-2 snap-x px-4"
     >
      {POPULAR_PRODUCTS.map((product) => (
       <div
        key={product.id}
        className="flex flex-col min-w-[calc(100%)] sm:min-w-[calc(50%-16px)] lg:min-w-[calc(25%-24px)] snap-start group bg-white p-3 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-500"
       >
        <div
         className="relative bg-[#F5F5F5] rounded-xl h-[260px] flex items-center justify-center overflow-hidden"
        >
         <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
         />

         <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
           onClick={(e) => { e.stopPropagation(); handleToggleFavorite(product); }}
           className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${isFavorite(product.id)
            ? 'bg-[#1443C3] text-white'
            : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
            }`}
          >
           <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
           onClick={(e) => { e.stopPropagation(); handleToggleCart(product); }}
           className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isInCart(product.id)
            ? 'bg-[#1443C3] text-white'
            : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
            }`}
          >
           <ShoppingCart className="w-5 h-5" />
          </button>
          <button
           onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
           className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:bg-[#1443C3] hover:text-white transition-all"
          >
           <Eye className="w-5 h-5" />
          </button>
         </div>

         <button
          onClick={() => {
           if (!isInCart(product.id)) {
            addToCart(product);
           }
           navigate('/cart');
          }}
          className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-gray-900"
         >
          <ShoppingCart className="w-4 h-4" />
          Buy Now
         </button>
        </div>

        <div className="mt-4 px-1 flex flex-col flex-grow">
         <h3 className="font-extrabold text-lg text-[#1a1a1a] mb-1 truncate group-hover:text-[#1443C3] transition-colors">{product.name}</h3>
         <p className="text-sm text-gray-500 mb-2">{product.description}</p>
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

