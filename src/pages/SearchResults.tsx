import { Eye, Heart, Search, ShoppingCart } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { products as productsData, type Product } from '../lib/data';

export const SearchResults = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const { toggleFavorite, isFavorite } = useFavorites();
 const { addToCart, removeFromCart, isInCart } = useCart();
 const { addToast } = useToast();
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchProducts = async () => {
   setLoading(true);
   setProducts(productsData);
   setLoading(false);
  };
  fetchProducts();
 }, []);

 const query = useMemo(() => {
  const params = new URLSearchParams(location.search);
  return params.get('q') || '';
 }, [location.search]);

 const filteredProducts = useMemo(() => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
   product.name?.toLowerCase().includes(lowerQuery) ||
   product.category?.toLowerCase().includes(lowerQuery) ||
   product.price?.toString().includes(lowerQuery)
  );
 }, [query, products]);

 const handleToggleFavorite = (product: any) => {
  const wasFavorite = isFavorite(product.id);
  toggleFavorite(product);
  if (!wasFavorite) {
   addToast('Added to favorites');
  }
  navigate('/favorites');
 };

 const handleToggleCart = (product: any) => {
  if (!isInCart(product.id)) {
   addToCart(product);
   addToast('Added to cart');
  }
  navigate('/cart');
 };

 return (
  <div className="min-h-screen bg-white flex flex-col">
   <Header />

   <main className="flex-grow py-16">
    <div className="max-w-[95%] mx-auto px-4">
     <div className="mb-12">
      <h1 className="text-3xl font-bold mb-4 text-[#1a1a1a]">
       {query ? `Search Results for "${query}"` : 'Search'}
      </h1>
      {!loading && (
       <p className="text-gray-500 font-medium">
        {filteredProducts.length} products found
       </p>
      )}
     </div>

     {loading ? (
      <div className="flex items-center justify-center py-20">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1443C3]"></div>
      </div>
     ) : filteredProducts.length === 0 ? (
      <div className="text-center py-20 bg-gray-50 rounded-lg">
       <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
       <h2 className="text-xl font-medium text-gray-600 mb-2">No products found</h2>
       <p className="text-gray-500 mb-8">Try searching for something else or check your spelling.</p>
       <button
        onClick={() => navigate('/')}
        className="bg-red-500 text-white px-8 py-3 rounded-sm font-medium hover:bg-red-600 transition-colors"
       >
        Go Back Home
       </button>
      </div>
     ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
       {filteredProducts.map((product) => (
        <div key={product.id} className="group flex flex-col">
         <div
          className="relative bg-gray-100 rounded-md mb-4 h-[280px] flex items-center justify-center overflow-hidden bg-no-repeat bg-center bg-[length:85%_auto] transition-all duration-300 cursor-pointer"
          style={{ backgroundImage: `url(${product.image})` }}
          onClick={() => navigate(`/products/${product.id}`)}
         >
          <div className="absolute top-3 right-3 flex flex-col gap-2">
           <button
            onClick={(e) => {
             e.stopPropagation();
             handleToggleFavorite(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${isFavorite(product.id)
             ? 'bg-red-500 text-white'
             : 'bg-white text-black hover:bg-red-500 hover:text-white'
             }`}
           >
            <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
           </button>
           <button
            onClick={(e) => {
             e.stopPropagation();
             handleToggleCart(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${isInCart(product.id)
             ? 'bg-red-500 text-white'
             : 'bg-white text-black hover:bg-red-500 hover:text-white'
             }`}
           >
            <ShoppingCart className="w-4 h-4" />
           </button>
           <button
            onClick={(e) => {
             e.stopPropagation();
             navigate(`/products/${product.id}`);
            }}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
           >
            <Eye className="w-4 h-4" />
           </button>
          </div>

          <button
           onClick={(e) => {
            e.stopPropagation();
            if (!isInCart(product.id)) {
             addToCart(product);
            }
            navigate('/cart');
           }}
           className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800"
          >
           Buy Now
          </button>
         </div>

         <div className="text-center">
          <h3
           className="font-bold text-lg mb-2 truncate text-[#1a1a1a] cursor-pointer hover:text-[#1443C3] transition-colors"
           onClick={() => navigate(`/products/${product.id}`)}
          >
           {product.name}
          </h3>
          <div className="flex justify-center items-center gap-3">
           <span className="text-red-500 font-bold text-xl">${product.price}</span>
          </div>
         </div>
        </div>
       ))}
      </div>
     )}
    </div>
   </main>

   <Footer />
  </div>
 );
};
