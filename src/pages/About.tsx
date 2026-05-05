import { Briefcase, DollarSign, Headphones, ShieldCheck, ShoppingBag, Truck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

import about from '../Assets/abnout.jpg';

export const About = () => {
 const stats = [
  { icon: <ShoppingBag className="w-8 h-8" />, value: '10.5k', label: 'Sellers active our site', active: false },
  { icon: <DollarSign className="w-8 h-8" />, value: '33k', label: 'Monthly Product Sale', active: true },
  { icon: <Users className="w-8 h-8" />, value: '45.5k', label: 'Customer active in our site', active: false },
  { icon: <Briefcase className="w-8 h-8" />, value: '25k', label: 'Anual gross sale in our site', active: false },
 ];

 const features = [
  {
   icon: <Truck className="w-10 h-10" />,
   title: 'FREE AND FAST DELIVERY',
   description: 'Free delivery for all orders over $140'
  },
  {
   icon: <Headphones className="w-10 h-10" />,
   title: '24/7 CUSTOMER SERVICE',
   description: 'Friendly 24/7 customer support'
  },
  {
   icon: <ShieldCheck className="w-10 h-10" />,
   title: 'MONEY BACK GUARANTEE',
   description: 'We return money within 30 days'
  },
 ];

 return (
  <div className="min-h-screen flex flex-col bg-white">
   <Header />

   <main className="flex-grow">

    <div className="container mx-auto px-4 py-8">
     <nav className="flex items-center gap-2 text-sm text-gray-500">
      <a href="/" className="hover:text-black">Home</a>
      <span>/</span>
      <span className="text-black font-medium">About</span>
     </nav>
    </div>

    <section className="py-16 overflow-hidden">
     <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16">

       <div className="lg:w-1/2 space-y-8">
        <motion.h1
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         className="text-5xl font-bold text-gray-900 tracking-tight"
        >
         Our Story
        </motion.h1>

        <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         className="space-y-6 text-gray-600 leading-relaxed text-lg"
        >
         <p>
          Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
         </p>
         <p>
          Exclusive has more than 1 Million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer electronics to household goods, beauty, fashion, sports equipment and groceries.
         </p>
        </motion.div>
       </div>

       <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="lg:w-1/2"
       >
        <div className="rounded-2xl overflow-hidden shadow-2xl">
         <img
          src={about}
          alt="Our Story"
          className="w-full h-full object-cover"
         />
        </div>
       </motion.div>

      </div>
     </div>
    </section>

    {/* Stats Section */}
    <section className="py-20 bg-gray-50">
     <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
       {stats.map((stat, index) => (
        <motion.div
         key={index}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ delay: index * 0.1 }}
         className={`p-8 rounded-2xl border transition-all duration-300 text-center group ${stat.active
          ? 'bg-[#1443C3] border-[#1443C3] text-white shadow-xl shadow-blue-100'
          : 'bg-white border-gray-100 text-black hover:bg-[#1443C3] hover:text-white hover:border-[#1443C3] hover:shadow-xl'
          }`}
        >
         <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors ${stat.active ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white/20'
          }`}>
          {stat.icon}
         </div>
         <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
         <p className="text-sm opacity-80">{stat.label}</p>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

    {/* Features Section */}
    <section className="py-24">
     <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
       {features.map((feature, index) => (
        <motion.div
         key={index}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ delay: index * 0.1 }}
         className="text-center space-y-6"
        >
         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto relative">
          <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center text-white">
           {feature.icon}
          </div>
         </div>
         <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
          <p className="text-sm text-gray-500">{feature.description}</p>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </section>

   </main>

   <Footer />
  </div>
 );
};
