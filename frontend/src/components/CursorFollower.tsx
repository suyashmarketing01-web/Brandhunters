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

  // Map sections to specific emotions and actions
  const getSectionEmoji = (sectionId: string) => {
    if (isOverButton) return '🎉';
    if (sectionId.includes('review') || sectionId.includes('success')) return '❤️';
    if (sectionId.includes('hero')) return '⚡';
    if (sectionId.includes('service') || sectionId.includes('detail')) return '✨';
    if (sectionId.includes('work') || sectionId.includes('curriculum')) return '⭐';
    if (sectionId.includes('contact') || sectionId.includes('footer')) return '👋';
    return '💨';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Detect element under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      // Check if hovering over a button or link
      const interactiveElement = element?.closest('button, a');
      const overButton = !!interactiveElement;
      setIsOverButton(overButton);

      // Set the spring target
      mouseX.set(e.clientX - (direction === 'right' ? 40 : -10));
      mouseY.set(e.clientY - (overButton ? 60 : 10));

      if (!isVisible) setIsVisible(true);

      // Detect section under cursor
      const section = element?.closest('section, [id]');
      if (section?.id) {
        setCurrentSection(section.id.toLowerCase());
      }

      const pikaX = cursorX.get();
      if (Math.abs(e.clientX - pikaX) > 10) {
        setDirection(e.clientX > pikaX ? 'right' : 'left');
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
          y: [0, -15, 0],
          rotate: [0, -10, 10, 0],
        } : {}}
        transition={isOverButton ? {
          y: { repeat: Infinity, duration: 0.4 },
          rotate: { repeat: Infinity, duration: 0.3 }
        } : {}}
      >
        <div className="relative">
          {(isMoving || isOverButton) && (
            <motion.div 
              animate={{ 
                x: [-5, 5, -5], 
                opacity: isOverButton ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
                scale: isOverButton ? [1, 1.2, 1] : 1
              }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className={`absolute inset-0 blur-xl rounded-full ${isOverButton ? 'bg-pink-400/30' : 'bg-yellow-400/10'}`}
            />
          )}
          
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif"
            alt="Pikachu Chaser" 
            className={`w-16 h-16 object-contain drop-shadow-xl transition-all duration-300 ${
              isOverButton ? 'brightness-125 scale-125' : isMoving ? 'brightness-110 skew-x-[-10deg]' : 'brightness-100'
            }`}
            referrerPolicy="no-referrer"
          />
          
          {/* Section specific indicator */}
          <motion.div
            key={currentSection + (isOverButton ? '-dance' : '')}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`absolute -top-4 -right-2 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-sm border border-black/5 ${isOverButton ? 'bg-pink-100/90' : 'bg-white/80'}`}
          >
            {getSectionEmoji(currentSection)}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}



