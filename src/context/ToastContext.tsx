import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

interface Toast {
 id: number;
 message: string;
}

interface ToastContextType {
 addToast: (message: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [toasts, setToasts] = useState<Toast[]>([]);

 const addToast = (message: string) => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, message }]);
  setTimeout(() => {
   setToasts(prev => prev.filter(t => t.id !== id));
  }, 3000);
 };

 return (
  <ToastContext.Provider value={{ addToast }}>
   {children}
   <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
    <AnimatePresence>
     {toasts.map(toast => (
      <motion.div
       key={toast.id}
       initial={{ opacity: 0, y: -50 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -50 }}
       className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg border border-white/20 text-sm font-medium flex items-center gap-2"
      >
       <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
       {toast.message}
      </motion.div>
     ))}
    </AnimatePresence>
   </div>
  </ToastContext.Provider>
 );
};

export const useToast = () => {
 const context = React.useContext(ToastContext);
 if (context === undefined) {
  throw new Error('useToast must be used within a ToastProvider');
 }
 return context;
};
