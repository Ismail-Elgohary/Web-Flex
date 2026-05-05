import { products, type Product } from '@/src/lib/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import music from '../../Assets/music.png';
import { useCart } from '../../context/CartContext';

export const MusicBanner = () => {
 const navigate = useNavigate();
 const { addToCart, isInCart } = useCart();
 const [product, setProduct] = useState<Product | null>(null);
 const productId = "259c3l1DQQzDpCTbx3c4";

 useEffect(() => {
  const p = products.filter((p) => p.id === productId)[0];
  if (p) setProduct(p);
 }, []);

 async function handleBuy() {
  console.log("product", product);
  if (!product) return;
  if (!isInCart(product.id)) {
   addToCart(product);
  }
  await navigate('/cart');
 }

 return (
  <section className="max-w-[95%] mx-auto px-4 mb-16">
   <div className="bg-black rounded-sm p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
    <div className="flex-1 z-10">
     <span className="text-[#00FF66] font-semibold mb-4 block uppercase tracking-widest text-sm">Categories</span>
     <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight mb-8">
      Enhance Your <br /> Music Experience
     </h2>

     <div className="flex gap-4 mb-10">
      {[
       { val: '23', label: 'Hours' },
       { val: '05', label: 'Days' },
       { val: '59', label: 'Minutes' },
       { val: '35', label: 'Seconds' }
      ].map((item, idx) => (
       <div key={idx} className="bg-white rounded-full w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-default">
        <span className="font-bold text-xs md:text-sm text-black">{item.val}</span>
        <span className="text-[8px] md:text-[10px] font-medium text-gray-500 uppercase">{item.label}</span>
       </div>
      ))}
     </div>

     <button
      onClick={handleBuy}
      className="bg-[#1443C3] text-white px-12 py-4 rounded-md font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 transform hover:-translate-y-1 active:scale-95"
     >
      Buy Now!
     </button>
    </div>

    <div className="flex-1 relative z-10 flex justify-center">
     {/* Glow effect */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 blur-[100px] rounded-full"></div>
     <img
      src={music}
      alt="JBL Speaker"
      className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl"
     />
    </div>
   </div>
  </section>
 );
};
