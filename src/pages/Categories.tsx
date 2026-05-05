import { ChevronRight, Eye, Heart, ShoppingCart, X } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { categories, type Product } from '../lib/data';

const ProductCard: React.FC<{ product: Product }> = memo(({ product }) => {
 const { isAuthenticated } = useAuth();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { addToCart, removeFromCart, isInCart } = useCart();
 const { addToast } = useToast();
 const navigate = useNavigate();

 const handleToggleFavorite = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!isAuthenticated) {
   addToast("You have to login to favorite products");
   return;
  }
  const was = isFavorite(product.id);
  toggleFavorite(product);
  addToast(was ? 'Removed from favorites' : 'Added to favorites');
 };

 const handleToggleCart = (e: React.MouseEvent) => {
  e.stopPropagation();
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
  <div className="group flex flex-col bg-white p-3 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-500">
   <div className="relative bg-[#F5F5F5] rounded-xl h-65 flex items-center justify-center overflow-hidden">
    <img
     src={product.image}
     alt={product.name}
     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Action buttons */}
    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
     <button
      onClick={handleToggleFavorite}
      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${isFavorite(product.id) ? 'bg-[#1443C3] text-white' : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
       }`}
     >
      <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
     </button>
     <button
      onClick={handleToggleCart}
      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${isInCart(product.id) ? 'bg-[#1443C3] text-white' : 'bg-white text-black hover:bg-[#1443C3] hover:text-white'
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

    {/* Buy Now bar */}
    <button
     onClick={() => {
      if (!isInCart(product.id)) { addToCart(product); addToast('Added to cart'); }
      navigate('/cart');
     }}
     className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm font-black uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-gray-900"
    >
     <ShoppingCart className="w-4 h-4" /> Buy Now
    </button>
   </div>

   <div className="mt-4 px-1 flex flex-col flex-grow">
    <h3 className="font-extrabold text-lg text-[#1a1a1a] mb-1 truncate group-hover:text-[#1443C3] transition-colors">
     {product.name}
    </h3>
    <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.description}</p>
   </div>
  </div>
 );
});
ProductCard.displayName = 'ProductCard';

const CategoryCard: React.FC<{ category: typeof categories[0]; onClick: () => void }> = ({ category, onClick }) => (
 <div
  onClick={onClick}
  className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-[300px]"
 >
  <img
   src={category.image}
   alt={category.name}
   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1443C3] text-xs font-black px-3 py-1.5 rounded-full shadow">
   {category.products.length} Products
  </div>

  <div className="absolute bottom-0 left-0 right-0 p-6">
   {/* Mini thumbnails on hover */}
   <div className="flex gap-2 mb-3">
    {category.products.slice(0, 3).map((p, idx) => (
     <div
      key={p.id}
      className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={{ transitionDelay: `${idx * 60}ms` }}
     >
      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
     </div>
    ))}
    {category.products.length > 3 && (
     <div
      className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={{ transitionDelay: '180ms' }}
     >
      +{category.products.length - 3}
     </div>
    )}
   </div>
   <h3 className="text-white font-black text-3xl tracking-tight mb-2">{category.name}</h3>
   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
    <span className="text-white/80 text-sm font-semibold">Browse all</span>
    <ChevronRight className="w-4 h-4 text-white/80" />
   </div>
  </div>
 </div>
);

const ProductsPanel: React.FC<{ category: typeof categories[0] | null; onClose: () => void }> = ({ category, onClose }) => {
 if (!category) return null;
 return (
  <>
   <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />
   <div
    className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-2xl flex flex-col"
    style={{ maxHeight: '85vh', animation: 'slideUp 0.35s cubic-bezier(0.32,0.72,0,1)' }}
   >
    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0">
     <div className="flex items-center gap-4">
      <div className="w-5 h-10 bg-[#1443C3] rounded-sm" />
      <div>
       <span className="text-[#1443C3] font-bold text-sm block leading-none mb-1">Category</span>
       <h2 className="text-2xl font-black text-black leading-none">{category.name}</h2>
      </div>
     </div>
     <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
      <X className="w-5 h-5 text-gray-600" />
     </button>
    </div>
    <div className="overflow-y-auto flex-1 px-8 py-6">
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {category.products.map((product) => (
       <ProductCard key={product.id} product={product} />
      ))}
     </div>
    </div>
   </div>
   <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
  </>
 );
};

export const Categories: React.FC = () => {
 const [activeCategory, setActiveCategory] = useState<typeof categories[0] | null>(null);

 return (
  <div className="min-h-screen bg-white flex flex-col">
   <Header />
   <main className="flex-grow py-16">
    <div className="max-w-[95%] mx-auto px-12">
     <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
       <div className="w-5 h-10 bg-[#1443C3] rounded-sm" />
       <span className="text-[#1443C3] font-bold">Categories</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-black">Browse By Category</h2>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((cat) => (
       <CategoryCard key={cat.id} category={cat} onClick={() => setActiveCategory(cat)} />
      ))}
     </div>
    </div>
   </main>
   <Footer />
   <ProductsPanel category={activeCategory} onClose={() => setActiveCategory(null)} />
  </div>
 );
};

export default Categories;
