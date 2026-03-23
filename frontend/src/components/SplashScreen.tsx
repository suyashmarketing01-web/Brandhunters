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
            <div className="relative z-10 flex items-center justify-center h-40 w-40 sm:h-52 sm:w-52 mt-6 sm:mt-10">
              {/* Left Hand */}
              <motion.div
                initial={{ x: -80, y: 30, opacity: 0, rotate: -30 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-1/2 origin-bottom-right mr-[-1px]"
              >
                <svg width="52" height="135" viewBox="0 0 70 180" fill="none" className="scale-x-[-1] sm:w-[62px] sm:h-[160px]">
                  <defs>
                    <linearGradient id="sL" x1="0" y1="0" x2="0.8" y2="1">
                      <stop offset="0%" stopColor="#FDDCB5"/>
                      <stop offset="100%" stopColor="#EDBA8B"/>
                    </linearGradient>
                  </defs>
                  {/* Fingers joined together pointing up */}
                  <path d="M 22 8 C 22 4, 26 2, 28 6 L 28 52" stroke="#D4A574" strokeWidth="0.8" fill="url(#sL)"/>
                  <path d="M 28 6 C 28 2, 32 0, 34 4 L 34 50" stroke="#D4A574" strokeWidth="0.8" fill="url(#sL)"/>
                  <path d="M 34 4 C 34 0, 38 0, 40 5 L 40 48" stroke="#D4A574" strokeWidth="0.8" fill="url(#sL)"/>
                  <path d="M 40 5 C 40 2, 44 3, 45 8 L 45 46" stroke="#D4A574" strokeWidth="0.8" fill="url(#sL)"/>
                  {/* Palm body */}
                  <path d="M 20 52 C 18 52, 16 54, 16 58 L 16 90 C 16 100, 20 108, 26 114 L 30 118 C 24 124, 20 132, 18 142 L 16 155 C 15 162, 18 168, 24 170 L 48 170 C 54 168, 56 162, 55 155 L 52 140 C 50 132, 46 124, 42 118 L 46 114 C 52 108, 56 100, 56 90 L 56 58 C 56 54, 54 52, 52 52 Z" fill="url(#sL)" stroke="#D4A574" strokeWidth="1"/>
                  {/* Thumb */}
                  <path d="M 16 62 C 10 58, 6 52, 8 46 C 10 40, 14 42, 16 50" fill="url(#sL)" stroke="#D4A574" strokeWidth="1"/>
                  {/* Finger joint lines */}
                  <line x1="28" y1="50" x2="28" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="34" y1="48" x2="34" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="40" y1="46" x2="40" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="45" y1="46" x2="45" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  {/* Palm creases */}
                  <path d="M 20 75 C 30 70, 42 68, 52 72" stroke="#D4A574" strokeWidth="0.5" opacity="0.25" fill="none"/>
                  <path d="M 20 85 C 30 82, 44 80, 52 84" stroke="#D4A574" strokeWidth="0.5" opacity="0.25" fill="none"/>
                  {/* Red alta on fingertips */}
                  <ellipse cx="25" cy="8" rx="4" ry="5" fill="#C20000" opacity="0.35"/>
                  <ellipse cx="31" cy="4" rx="4" ry="4" fill="#C20000" opacity="0.35"/>
                  <ellipse cx="37" cy="3" rx="4" ry="4" fill="#C20000" opacity="0.35"/>
                  <ellipse cx="43" cy="7" rx="3.5" ry="4" fill="#C20000" opacity="0.35"/>
                  {/* Mehndi dot pattern on palm */}
                  <circle cx="36" cy="78" r="6" fill="#C20000" opacity="0.12"/>
                  <circle cx="36" cy="78" r="9" stroke="#C20000" strokeWidth="0.5" opacity="0.1" fill="none" strokeDasharray="2 2"/>
                  {/* Bangles at wrist */}
                  <rect x="14" y="152" width="44" height="5" rx="2.5" fill="#C20000" opacity="0.85"/>
                  <rect x="16" y="159" width="40" height="3.5" rx="1.75" fill="#F4A261" opacity="0.9"/>
                  <rect x="14" y="164" width="44" height="4.5" rx="2.25" fill="#C20000" opacity="0.7"/>
                </svg>
              </motion.div>

              {/* Right Hand */}
              <motion.div
                initial={{ x: 80, y: 30, opacity: 0, rotate: 30 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 origin-bottom-left ml-[-1px]"
              >
                <svg width="52" height="135" viewBox="0 0 70 180" fill="none" className="sm:w-[62px] sm:h-[160px]">
                  <defs>
                    <linearGradient id="sR" x1="0" y1="0" x2="0.8" y2="1">
                      <stop offset="0%" stopColor="#FDDCB5"/>
                      <stop offset="100%" stopColor="#EDBA8B"/>
                    </linearGradient>
                  </defs>
                  {/* Fingers joined together pointing up */}
                  <path d="M 22 8 C 22 4, 26 2, 28 6 L 28 52" stroke="#D4A574" strokeWidth="0.8" fill="url(#sR)"/>
                  <path d="M 28 6 C 28 2, 32 0, 34 4 L 34 50" stroke="#D4A574" strokeWidth="0.8" fill="url(#sR)"/>
                  <path d="M 34 4 C 34 0, 38 0, 40 5 L 40 48" stroke="#D4A574" strokeWidth="0.8" fill="url(#sR)"/>
                  <path d="M 40 5 C 40 2, 44 3, 45 8 L 45 46" stroke="#D4A574" strokeWidth="0.8" fill="url(#sR)"/>
                  {/* Palm body */}
                  <path d="M 20 52 C 18 52, 16 54, 16 58 L 16 90 C 16 100, 20 108, 26 114 L 30 118 C 24 124, 20 132, 18 142 L 16 155 C 15 162, 18 168, 24 170 L 48 170 C 54 168, 56 162, 55 155 L 52 140 C 50 132, 46 124, 42 118 L 46 114 C 52 108, 56 100, 56 90 L 56 58 C 56 54, 54 52, 52 52 Z" fill="url(#sR)" stroke="#D4A574" strokeWidth="1"/>
                  {/* Thumb */}
                  <path d="M 56 62 C 62 58, 66 52, 64 46 C 62 40, 58 42, 56 50" fill="url(#sR)" stroke="#D4A574" strokeWidth="1"/>
                  {/* Finger joint lines */}
                  <line x1="28" y1="50" x2="28" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="34" y1="48" x2="34" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="40" y1="46" x2="40" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="45" y1="46" x2="45" y2="56" stroke="#D4A574" strokeWidth="0.5" opacity="0.4"/>
                  {/* Palm creases */}
                  <path d="M 20 75 C 30 70, 42 68, 52 72" stroke="#D4A574" strokeWidth="0.5" opacity="0.25" fill="none"/>
                  <path d="M 20 85 C 30 82, 44 80, 52 84" stroke="#D4A574" strokeWidth="0.5" opacity="0.25" fill="none"/>
                  {/* Red alta on fingertips */}
                  <ellipse cx="25" cy="8" rx="4" ry="5" fill="#C20000" opacity="0.35"/>
                  <ellipse cx="31" cy="4" rx="4" ry="4" fill="#C20000" opacity="0.35"/>
                  <ellipse cx="37" cy="3" rx="4" ry="4" fill="#C20000" opacity="0.35"/>
                  <ellipse cx="43" cy="7" rx="3.5" ry="4" fill="#C20000" opacity="0.35"/>
                  {/* Mehndi dot pattern on palm */}
                  <circle cx="36" cy="78" r="6" fill="#C20000" opacity="0.12"/>
                  <circle cx="36" cy="78" r="9" stroke="#C20000" strokeWidth="0.5" opacity="0.1" fill="none" strokeDasharray="2 2"/>
                  {/* Bangles at wrist */}
                  <rect x="14" y="152" width="44" height="5" rx="2.5" fill="#C20000" opacity="0.85"/>
                  <rect x="16" y="159" width="40" height="3.5" rx="1.75" fill="#F4A261" opacity="0.9"/>
                  <rect x="14" y="164" width="44" height="4.5" rx="2.25" fill="#C20000" opacity="0.7"/>
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
