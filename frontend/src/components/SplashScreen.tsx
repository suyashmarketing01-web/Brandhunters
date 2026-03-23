import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    
    // Disable scrolling while splash is visible
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #C20000 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />

          {/* Animated ring behind logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-brand-red/10"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-brand-red/5"
          />

          <motion.div
            className="flex flex-col items-center gap-4 sm:gap-6 relative z-10"
          >
            {/* Logo Icon - Main attraction */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              <img 
                src="/images/logo-icon.png" 
                alt="Brand Hunters" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-lg"
              />
            </motion.div>

            {/* Text Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <img 
                src="/images/logo-text.png" 
                alt="Brand Hunters Digital Marketing Agency" 
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-brand-red"
            >
              We believe in results, not plans.
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="w-32 sm:w-40 h-[2px] bg-black/5 rounded-full overflow-hidden mt-2"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-red to-brand-red/60 origin-left rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
