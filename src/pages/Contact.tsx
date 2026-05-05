import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showErrors, setShowErrors] = React.useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, name: value });
      if (errors.name) setErrors({ ...errors, name: '' });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^[0-9]*$/.test(value)) {
      setFormData({ ...formData, phone: value });
      if (errors.phone) setErrors({ ...errors, phone: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    const newErrors = {
      name: !formData.name ? 'Name is required' : !/^[a-zA-Z\s]+$/.test(formData.name) ? 'Name must contain only letters and spaces' : '',
      email: !formData.email ? 'Email is required' : !validateEmail(formData.email) ? 'Enter a valid email address' : '',
      phone: !formData.phone ? 'Phone is required' : !/^[0-9]+$/.test(formData.phone) ? 'Phone must contain only numbers' : '',
      message: !formData.message ? 'Message is required' : ''
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowErrors(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black font-medium">Contact</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3 bg-white p-8 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-50"
            >
              {/* Call To Us */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#1443C3] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-100">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Call To Us</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-800">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200 mb-8"></div>

              {/* Write To Us */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#1443C3] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-100">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Write To Us</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-800">
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3 bg-white p-8 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-50"
            >
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={handleNameChange}
                      className={`bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#1443C3] outline-none ${showErrors && errors.name ? 'ring-1 ring-red-500' : ''}`}
                    />
                    {showErrors && errors.name && <span className="text-red-500 text-[10px] ml-1">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input 
                      type="email" 
                      placeholder="Your Email *" 
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#1443C3] outline-none ${showErrors && errors.email ? 'ring-1 ring-red-500' : ''}`}
                    />
                    {showErrors && errors.email && <span className="text-red-500 text-[10px] ml-1">{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input 
                      type="tel" 
                      placeholder="Your Phone *" 
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#1443C3] outline-none ${showErrors && errors.phone ? 'ring-1 ring-red-500' : ''}`}
                    />
                    {showErrors && errors.phone && <span className="text-red-500 text-[10px] ml-1">{errors.phone}</span>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <textarea 
                    placeholder="Your Message" 
                    rows={8}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#1443C3] outline-none resize-none ${showErrors && errors.message ? 'ring-1 ring-red-500' : ''}`}
                  ></textarea>
                  {showErrors && errors.message && <span className="text-red-500 text-[10px] ml-1">{errors.message}</span>}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button 
                    type="submit"
                    className="bg-[#1443C3] text-white px-10 py-4 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    Send Message
                  </button>
                  {showErrors && Object.values(errors).some(e => e !== '') && (
                    <span className="text-red-500 text-xs italic">Please fix the errors above before sending.</span>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
