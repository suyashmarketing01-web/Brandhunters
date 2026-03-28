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
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [location.pathname]);

  const petals = Array.from({ length: 16 });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF8F5] text-brand-black"
        >
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #C20000 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />

          <motion.div
            initial={{ y: 0, scale: 1 }}
            animate={{ 
              y: [0, 0, 10, 0],
            }}
            transition={{ 
              duration: 2, 
              times: [0, 0.5, 0.8, 1], 
              delay: 0.5, 
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center gap-4 sm:gap-6 relative"
          >
            {/* Mandala Background */}
            <div className="absolute top-[-50px] sm:top-[-60px] left-1/2 -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 pointer-events-none flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Outer Petals - Brand Red */}
                {petals.map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-5 h-20 sm:w-6 sm:h-24 origin-bottom"
                    style={{ transform: `rotate(${(i * 360) / 16}deg) translateY(-40px)` }}
                  >
                    <svg viewBox="0 0 24 64" className="w-full h-full text-brand-red/40" fill="currentColor">
                      <path d="M12 0C18 20 24 40 12 64C0 40 6 20 12 0Z" />
                    </svg>
                  </motion.div>
                ))}
                {/* Inner Petals - Darker Red */}
                {petals.map((_, i) => (
                  <motion.div
                    key={`inner-${i}`}
                    className="absolute w-3 h-14 sm:w-4 sm:h-16 origin-bottom"
                    style={{ transform: `rotate(${((i * 360) / 16) + 11.25}deg) translateY(-30px)` }}
                  >
                    <svg viewBox="0 0 24 64" className="w-full h-full text-brand-red/60" fill="currentColor">
                      <path d="M12 0C18 20 24 40 12 64C0 40 6 20 12 0Z" />
                    </svg>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Hands Animation */}
            <div className="relative z-10 flex items-center justify-center h-36 w-36 sm:h-48 sm:w-48 mt-8 sm:mt-12">
              {/* Left Hand */}
              <motion.div
                initial={{ x: -60, y: 40, opacity: 0, rotate: -45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-1/2 origin-bottom-right"
              >
                <svg width="50" height="130" viewBox="0 0 60 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] sm:w-[60px] sm:h-[150px]">
                  <path d="M 0 0 L 0 90 C 5 100, 25 120, 40 150 L 60 140 C 40 100, 15 40, 0 0 Z" fill="#FFF5E1" stroke="#4A0E0E" strokeWidth="1.5"/>
                  <path d="M 0 0 L 0 30 C 5 20, 8 10, 0 0 Z" fill="#C20000"/>
                  <circle cx="12" cy="80" r="10" fill="#C20000"/>
                  <circle cx="12" cy="80" r="14" stroke="#C20000" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
                  <path d="M 28 125 L 48 115" stroke="#C20000" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 32 135 L 52 125" stroke="#F4A261" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M 24 115 L 44 105" stroke="#C20000" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M 0 50 C 5 55, 8 65, 0 70" stroke="#4A0E0E" strokeWidth="1" fill="none"/>
                </svg>
              </motion.div>

              {/* Right Hand */}
              <motion.div
                initial={{ x: 60, y: 40, opacity: 0, rotate: 45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 origin-bottom-left"
              >
                <svg width="50" height="130" viewBox="0 0 60 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[60px] sm:h-[150px]">
                  <path d="M 0 0 L 0 90 C 5 100, 25 120, 40 150 L 60 140 C 40 100, 15 40, 0 0 Z" fill="#FFF5E1" stroke="#4A0E0E" strokeWidth="1.5"/>
                  <path d="M 0 0 L 0 30 C 5 20, 8 10, 0 0 Z" fill="#C20000"/>
                  <circle cx="12" cy="80" r="10" fill="#C20000"/>
                  <circle cx="12" cy="80" r="14" stroke="#C20000" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
                  <path d="M 28 125 L 48 115" stroke="#C20000" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 32 135 L 52 125" stroke="#F4A261" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M 24 115 L 44 105" stroke="#C20000" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M 0 50 C 5 55, 8 65, 0 70" stroke="#4A0E0E" strokeWidth="1" fill="none"/>
                </svg>
              </motion.div>
            </div>

            {/* Brand Logo - appears between hands and text */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 -mt-2"
            >
              <img 
                src="/images/logo-icon.png" 
                alt="Brand Hunters" 
                className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-1.5 sm:gap-2 relative z-10"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-[0.1em] text-brand-red">
                Namaste
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xs sm:text-sm font-sans tracking-widest uppercase text-brand-black/60"
              >
                Thanks for visiting
              </motion.p>
            </motion.div>

            {/* Brand text logo below */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-1 relative z-10 mt-1"
            >
              <img 
                src="/images/logo-text.png" 
                alt="Brand Hunters Digital Marketing Agency" 
                className="h-8 sm:h-10 md:h-12 w-auto opacity-80"
              />
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
                className="h-[2px] w-12 sm:w-16 bg-brand-red/50 rounded-full mt-1"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
