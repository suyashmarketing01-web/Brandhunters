import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function CursorFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 80, mass: 1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isOverButton, setIsOverButton] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('default');
  
  const lastX = useRef(0);
  const lastY = useRef(0);
  const moveTimeout = useRef<NodeJS.Timeout | null>(null);
  const particleId = useRef(0);

  // Map sections to marketing-themed emojis
  const getSectionEmoji = (sectionId: string) => {
    if (isOverButton) return '🎯';
    if (sectionId.includes('review') || sectionId.includes('success')) return '⭐';
    if (sectionId.includes('hero')) return '🚀';
    if (sectionId.includes('service') || sectionId.includes('detail')) return '📈';
    if (sectionId.includes('work') || sectionId.includes('curriculum')) return '💡';
    if (sectionId.includes('contact') || sectionId.includes('footer')) return '✉️';
    return '✨';
  };

  useEffect(() => {
    // Don't show on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      const interactiveElement = element?.closest('button, a');
      const overButton = !!interactiveElement;
      setIsOverButton(overButton);

      mouseX.set(e.clientX - (direction === 'right' ? 30 : -5));
      mouseY.set(e.clientY - (overButton ? 50 : 5));

      if (!isVisible) setIsVisible(true);

      const section = element?.closest('section, [id]');
      if (section?.id) {
        setCurrentSection(section.id.toLowerCase());
      }

      const followerX = cursorX.get();
      if (Math.abs(e.clientX - followerX) > 10) {
        setDirection(e.clientX > followerX ? 'right' : 'left');
      }

      const deltaX = e.clientX - lastX.current;
      const deltaY = e.clientY - lastY.current;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      setIsMoving(true);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 200);

      if ((speed > 15 || isOverButton) && Math.random() > 0.6) {
        const emoji = getSectionEmoji(currentSection);
        const newParticle = {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          emoji: emoji
        };
        setParticles(prev => [...prev.slice(-8), newParticle]);
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 800);
      }

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [mouseX, mouseY, isVisible, direction, cursorX, currentSection, isOverButton]);

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0.5, x: particle.x, y: particle.y }}
            animate={{ 
              opacity: 0, 
              scale: 1.2, 
              y: particle.y + (Math.random() * 40 - 20),
              x: particle.x + (Math.random() * 40 - 20)
            }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-[9998] text-lg"
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          pointerEvents: 'none',
          zIndex: 9999,
          scaleX: direction === 'left' ? -1 : 1,
        }}
        animate={isOverButton ? {
          y: [0, -10, 0],
          rotate: [0, -5, 5, 0],
        } : {}}
        transition={isOverButton ? {
          y: { repeat: Infinity, duration: 0.5 },
          rotate: { repeat: Infinity, duration: 0.4 }
        } : {}}
      >
        <div className="relative">
          {/* Glow effect when moving */}
          {(isMoving || isOverButton) && (
            <motion.div 
              animate={{ 
                x: [-3, 3, -3], 
                opacity: isOverButton ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
                scale: isOverButton ? [1, 1.3, 1] : 1
              }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className={`absolute inset-0 blur-xl rounded-full ${isOverButton ? 'bg-red-500/40' : 'bg-red-400/15'}`}
            />
          )}
          
          {/* Marketing Rocket SVG */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className={`w-12 h-12 drop-shadow-xl transition-all duration-300 ${
              isOverButton ? 'scale-125' : isMoving ? 'scale-110' : 'scale-100'
            }`}
            animate={isMoving ? { rotate: [0, -15] } : { rotate: 0 }}
          >
            {/* Rocket body */}
            <defs>
              <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C20000" />
                <stop offset="100%" stopColor="#FF4444" />
              </linearGradient>
              <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#4AAED9" />
              </linearGradient>
            </defs>
            
            {/* Flame trail */}
            <motion.g
              animate={isMoving ? { 
                opacity: [0.6, 1, 0.6],
                scaleY: [0.8, 1.2, 0.8]
              } : {
                opacity: [0.3, 0.6, 0.3],
                scaleY: [0.6, 0.9, 0.6]
              }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              style={{ transformOrigin: '32px 55px' }}
            >
              <path d="M28 52 L32 62 L36 52" fill="#FF8C00" opacity="0.9" />
              <path d="M30 52 L32 58 L34 52" fill="#FFD700" opacity="0.8" />
            </motion.g>
            
            {/* Rocket main body */}
            <path d="M32 8 C32 8 22 20 22 38 C22 44 26 50 28 52 L36 52 C38 50 42 44 42 38 C42 20 32 8 32 8Z" 
                  fill="url(#rocketGrad)" stroke="#A00000" strokeWidth="0.5" />
            
            {/* Rocket window */}
            <circle cx="32" cy="28" r="5" fill="url(#windowGrad)" stroke="#fff" strokeWidth="1.5" />
            <circle cx="31" cy="27" r="1.5" fill="white" opacity="0.7" />
            
            {/* Rocket fins */}
            <path d="M22 40 L16 48 L22 48 Z" fill="#A00000" />
            <path d="M42 40 L48 48 L42 48 Z" fill="#A00000" />
            
            {/* Rocket nose cone highlight */}
            <path d="M32 8 C32 8 28 16 27 22" stroke="white" strokeWidth="1" opacity="0.3" fill="none" strokeLinecap="round" />
            
            {/* ROI text on body */}
            <text x="32" y="42" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">ROI</text>
          </motion.svg>
          
          {/* Section emoji indicator */}
          <motion.div
            key={currentSection + (isOverButton ? '-active' : '')}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`absolute -top-3 -right-1 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md border ${isOverButton ? 'bg-red-50/90 border-red-200' : 'bg-white/90 border-black/5'}`}
          >
            {getSectionEmoji(currentSection)}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
