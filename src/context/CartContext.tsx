import type { Product } from '@/src/lib/data';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
interface CartItem {
 id: string;
 name: string;
 price: number;
 image: string;
 quantity: number;
}

interface CartContextType {
 cart: CartItem[];
 addToCart: (product: Product) => void;
 removeFromCart: (productId: string) => void;
 updateQuantity: (productId: string, quantity: number) => void;
 isInCart: (productId: string) => boolean;
 clearCart: () => void;
 cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
 const { isAuthenticated } = useAuth();
 const [cart, setCart] = useState<CartItem[]>(() => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
 });

 useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
 }, [cart]);

 const addToCart = (product: Product) => {
  if (!isAuthenticated) return;
  setCart(prevCart => {
   const existingItem = prevCart.find(item => item.id === product.id);
   if (existingItem) {
    return prevCart.map(item =>
     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
   }
   return [...prevCart, { ...product, id: product.id, quantity: 1 }];
  });
 };

 const isInCart = (productId: string) => {
  return cart.some(item => item.id === productId);
 };

 const updateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
   removeFromCart(productId);
   return;
  }
  setCart(prevCart =>
   prevCart.map(item =>
    item.id === productId ? { ...item, quantity } : item
   )
  );
 };

 const removeFromCart = (productId: string) => {
  setCart(prevCart => prevCart.filter(item => item.id !== productId));
 };

 const clearCart = () => {
  setCart([]);
 };

 const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

 return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isInCart, clearCart, cartCount }}>
   {children}
  </CartContext.Provider>
 );
};

export const useCart = () => {
 const context = useContext(CartContext);
 if (context === undefined) {
  throw new Error('useCart must be used within a CartProvider');
 }
 return context;
};
