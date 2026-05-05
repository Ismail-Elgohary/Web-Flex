import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../lib/data';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
 favorites: Product[];
 toggleFavorite: (product: Product) => void;
 isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { isAuthenticated } = useAuth();
 const [favorites, setFavorites] = useState<Product[]>(() => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
 });

 useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
 }, [favorites]);

 const toggleFavorite = (product: Product) => {
  if (!isAuthenticated) return;
  setFavorites(prev => {
   const exists = prev.find(p => p.id === product.id);
   if (exists) {
    return prev.filter(p => p.id !== product.id);
   }
   return [...prev, product];
  });
 };

 const isFavorite = (productId: string) => {
  return favorites.some(p => p.id === productId);
 };

 return (
  <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
   {children}
  </FavoritesContext.Provider>
 );
};

export const useFavorites = () => {
 const context = useContext(FavoritesContext);
 if (context === undefined) {
  throw new Error('useFavorites must be used within a FavoritesProvider');
 }
 return context;
};
