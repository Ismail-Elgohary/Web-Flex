import { faBars, faCircleInfo, faEnvelope, faHeart, faHome, faLayerGroup, faRightToBracket, faSearch, faShoppingCart, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header = () => {
 const { favorites } = useFavorites();
 const { cartCount } = useCart();
 const { user, isAuthenticated, logout } = useAuth();
 const [searchQuery, setSearchQuery] = useState('');
 const [isSearchExpanded, setIsSearchExpanded] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
 const searchInputRef = useRef<HTMLInputElement>(null);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const navigate = useNavigate();

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim()) {
   navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
   setSearchQuery('');
   setIsSearchExpanded(false);
  }
 };

 useEffect(() => {
  if (isSearchExpanded && searchInputRef.current) {
   searchInputRef.current.focus();
  }
 }, [isSearchExpanded]);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    setIsUserDropdownOpen(false);
   }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const firstName = user?.name.split(' ')[0];

 useEffect(() => {
  if (isAuthenticated && !user) {
  }
 }, [isAuthenticated, user]);

 const handleLogout = () => {
  logout();
  setIsUserDropdownOpen(false);
  navigate('/');
 };

 return (
  <div className="sticky top-0 z-50 w-full bg-[#7DA2F3] border-b border-white/10 shadow-sm">
   <div className="container mx-auto px-4 h-16 flex items-center justify-between text-white">
    <Link to="/" className="flex items-center group">
     <img src={logo} alt="FLX" className="h-12 object-contain" />
    </Link>


    <nav className="hidden md:flex items-center gap-8">
     {[
      { name: 'Home', path: '/', icon: faHome },
      { name: 'Contact', path: '/contact', icon: faEnvelope },
      { name: 'About', path: '/about', icon: faCircleInfo },
      { name: 'Category', path: '/categories', icon: faLayerGroup }
     ].map((link) => (
      <Link
       key={link.name}
       to={link.path}
       className="text-lg font-bold text-white/90 hover:text-black transition-all duration-300 relative group py-2 flex items-center gap-2"
      >
       {link.name}
       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full rounded-full"></span>
      </Link>
     ))}
    </nav>

    <div className="flex items-center gap-4 md:gap-6">
     <div className="hidden lg:flex items-center">
      {isSearchExpanded ? (
       <form
        onSubmit={handleSearch}
        className="flex items-center bg-white/20 rounded-full px-4 py-1.5 border border-white/30 focus-within:bg-white/40 transition-all"
       >
        <input
         ref={searchInputRef}
         type="text"
         placeholder="Search products..."
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         onBlur={() => {
          if (!searchQuery.trim()) {
           setIsSearchExpanded(false);
          }
         }}
         className="bg-transparent border-none outline-none text-sm placeholder:text-white/70 w-48 text-white"
        />
        <button type="submit">
         <FontAwesomeIcon icon={faSearch} className="text-white text-xs ml-2" />
        </button>
       </form>
      ) : (
       <button
        onClick={() => setIsSearchExpanded(true)}
        className="hover:scale-110 transition-transform p-2 bg-white/10 rounded-full"
       >
        <FontAwesomeIcon icon={faSearch} className="text-lg" />
       </button>
      )}
     </div>

     <Link to="/favorites" className="hover:scale-110 transition-all relative p-2 bg-white/10 rounded-full">
      <FontAwesomeIcon icon={faHeart} className="text-lg" />
      {favorites.length > 0 && (
       <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#7DA2F3]">
        {favorites.length}
       </span>
      )}
     </Link>

     <Link to="/cart" className="hover:scale-110 transition-all relative p-2 bg-white/10 rounded-full">
      <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
      {cartCount > 0 && (
       <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#7DA2F3]">
        {cartCount}
       </span>
      )}
     </Link>

     <div className="relative" ref={dropdownRef}>
      <button
       onMouseEnter={() => setIsUserDropdownOpen(true)}
       onClick={() => {
        if (isAuthenticated) {
         navigate('/profile');
         setIsUserDropdownOpen(false);
        } else {
         setIsUserDropdownOpen(!isUserDropdownOpen);
        }
       }}
       className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-full transition-all"
      >
       <FontAwesomeIcon icon={faUser} className="text-lg" />
       {isAuthenticated && <span className="hidden lg:block text-xs font-bold uppercase">{firstName}</span>}
      </button>

      <AnimatePresence>
       {isUserDropdownOpen && (
        <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: 10 }}
         onMouseLeave={() => setIsUserDropdownOpen(false)}
         className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden py-1 border border-gray-100 z-[100]"
        >
         {isAuthenticated ? (
          <>
           <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 mb-1">
            <p className="text-xs text-gray-400 font-bold uppercase">Account</p>
            <p className="text-sm font-black truncate">{user?.name}</p>
           </div>
           <Link
            to="/profile"
            onClick={() => setIsUserDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors font-semibold"
           >
            <FontAwesomeIcon icon={faUser} className="w-4 text-blue-500" />
            Profile
           </Link>

           <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors font-semibold"
           >
            <FontAwesomeIcon icon={faRightToBracket} className="w-4" />
            Logout
           </button>
          </>
         ) : (
          <>
           <Link
            to="/login"
            onClick={() => setIsUserDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors font-semibold"
           >
            <FontAwesomeIcon icon={faRightToBracket} className="w-4 text-blue-500" />
            Login
           </Link>
           <Link
            to="/register"
            onClick={() => setIsUserDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors font-semibold"
           >
            <FontAwesomeIcon icon={faUserPlus} className="w-4 text-blue-500" />
            Register
           </Link>
          </>
         )}
        </motion.div>
       )}
      </AnimatePresence>
     </div>

     <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden p-2 hover:bg-white/10 rounded-full transition-all"
     >
      <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-xl" />
     </button>
    </div>
   </div>

   <AnimatePresence>
    {isMobileMenuOpen && (
     <>
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       onClick={() => setIsMobileMenuOpen(false)}
       className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] md:hidden"
      />
      <motion.aside
       initial={{ x: '100%' }}
       animate={{ x: 0 }}
       exit={{ x: '100%' }}
       transition={{ type: 'spring', damping: 25, stiffness: 200 }}
       className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-[#7DA2F3] z-[1000] md:hidden shadow-3xl flex flex-col pt-24"
      >
       <div className="flex flex-col gap-2 p-6">
        <form
         onSubmit={(e) => {
          handleSearch(e);
          setIsMobileMenuOpen(false);
         }}
         className="flex items-center bg-white/20 rounded-xl px-4 py-3 border border-white/30 focus-within:bg-white/40 transition-all mb-4"
        >
         <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-base placeholder:text-white/70 w-full text-white"
         />
         <button type="submit">
          <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
         </button>
        </form>

        {[
         { name: 'Home', path: '/', icon: faHome },
         { name: 'Contact', path: '/contact', icon: faEnvelope },
         { name: 'About', path: '/about', icon: faCircleInfo },
         { name: 'Category', path: '/categories', icon: faLayerGroup }
        ].map((link) => (
         <Link
          key={link.name}
          to={link.path}
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-4 text-xl font-bold p-4 rounded-xl hover:bg-white/10 hover:text-black transition-all border border-transparent hover:border-white/20"
         >
          {link.name}
         </Link>
        ))}

        <div className="h-[1px] bg-white/20 my-6 mx-4"></div>

        {isAuthenticated ? (
         <div className="flex flex-col gap-4">
          <Link
           to="/profile"
           onClick={() => setIsMobileMenuOpen(false)}
           className="flex items-center justify-center gap-3 bg-white text-[#7DA2F3] p-4 rounded-xl font-black shadow-lg"
          >
           YOUR PROFILE
          </Link>
          <button
           onClick={() => {
            handleLogout();
            setIsMobileMenuOpen(false);
           }}
           className="flex items-center justify-center gap-3 border-2 border-white p-4 rounded-xl font-black text-white"
          >
           LOGOUT
          </button>
         </div>
        ) : (
         <div className="flex flex-col gap-4">
          <Link
           to="/login"
           onClick={() => setIsMobileMenuOpen(false)}
           className="flex items-center justify-center gap-3 bg-white text-[#7DA2F3] p-4 rounded-xl font-black shadow-lg"
          >
           LOGIN
          </Link>
          <Link
           to="/register"
           onClick={() => setIsMobileMenuOpen(false)}
           className="flex items-center justify-center gap-3 border-2 border-white p-4 rounded-xl font-black text-white"
          >
           REGISTER
          </Link>
         </div>
        )}
       </div>
      </motion.aside>
     </>
    )}
   </AnimatePresence>
  </div>
 );
};
