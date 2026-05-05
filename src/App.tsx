import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { About } from './pages/About';
import { AllProducts } from './pages/AllProducts';
import { Cart } from './pages/Cart';
import { Categories } from './pages/Categories';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { Favorites } from './pages/Favorites';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ProductDetails } from './pages/ProductDetails';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { SearchResults } from './pages/SearchResults';
function App() {
 return (
  <ToastProvider>
   <AuthProvider>
    <CartProvider>
     <FavoritesProvider>
      <Router>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/all-products" element={<AllProducts />} />
       </Routes>
      </Router>
     </FavoritesProvider>
    </CartProvider>
   </AuthProvider>
  </ToastProvider>
 );
}

export default App;
