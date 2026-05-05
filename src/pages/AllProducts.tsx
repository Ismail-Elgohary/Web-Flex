import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { products } from '../lib/data';

export const AllProducts = () => {
 const { isAuthenticated } = useAuth();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { addToCart, removeFromCart, isInCart } = useCart();
 const { addToast } = useToast();
 const navigate = useNavigate();

 const handleToggleFavorite = (product: any) => {
  if (!isAuthenticated) {
   addToast('You have to login to favorite products');
   return;
  }
  const wasFavorite = isFavorite(product.id);
  toggleFavorite(product);
  if (!wasFavorite) {
   addToast('Added to favorites');
  }
 };

 const handleToggleCart = (product: any) => {
  if (!isAuthenticated) {
   addToast('You have to login to show products');
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
  <div className="min-h-screen bg-white flex flex-col">
   <Header />

   <main className="flex-grow py-16">
    <div className="max-w-[95%] mx-auto px-4">
     <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
       <h1 className="text-4xl font-bold text-black mb-2">All Products</h1>
       <p className="text-gray-500">Discover our complete collection of high-quality products.</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
       <span>Showing {products.length} products</span>
      </div>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
      {products.map((product, index) => (
       <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group flex flex-col"
       >
        {/* Image Area */}
        <div className="relative bg-[#F5F5F5] rounded-sm mb-4 h-[280px] flex items-center justify-center overflow-hidden">
         <img
          src={product.image}
          alt={product.name}
          className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
         />

         {/* Action Icons */}
         <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
           onClick={() => handleToggleFavorite(product)}
           className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${isFavorite(product.id)
            ? 'bg-[#1443C3] text-white'
            : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
            }`}
          >
           <Heart className={`w-4.5 h-4.5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
           onClick={() => handleToggleCart(product)}
           className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${isInCart(product.id)
            ? 'bg-[#1443C3] text-white'
            : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
            }`}
          >
           <ShoppingCart className="w-4.5 h-4.5" />
          </button>
          <button
           onClick={() => navigate(`/products/${product.id}`)}
           className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#1443C3] hover:text-white transition-colors"
          >
           <Eye className="w-4.5 h-4.5" />
          </button>
         </div>

         {/* Buy Now Button */}
         <button
          onClick={() => {
           navigate('/checkout');
          }}
          className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm font-medium transition-all hover:bg-gray-800 opacity-0 group-hover:opacity-100"
         >
          Buy Now
         </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2">
         <h3 className="font-bold text-base text-black truncate group-hover:text-[#1443C3] transition-colors">{product.name}</h3>
         <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        </div>
       </motion.div>
      ))}
     </div>
    </div>
   </main>

   <Footer />
  </div>
 );
};

