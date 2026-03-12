import { motion } from 'motion/react';

export default function BookAnimation() {
  return (
    <div className="relative w-64 h-48 md:w-80 md:h-60 flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Book Container */}
      <motion.div
        initial={{ rotateX: 20, rotateY: 0 }}
        animate={{ rotateX: 10, rotateY: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back Cover */}
        <div className="absolute w-[90%] h-full bg-brand-red rounded-r-lg shadow-2xl" style={{ transform: 'translateZ(-2px)' }} />

        {/* Pages (Static) */}
        <div className="absolute w-[85%] h-[90%] bg-white rounded-r-sm shadow-inner" style={{ transform: 'translateZ(0px)' }} />

        {/* Left Page (Opening) */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -160 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute left-1/2 w-1/2 h-full bg-white origin-left rounded-r-sm border-l border-black/5 shadow-lg flex flex-col p-4 gap-2"
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-2 bg-black/5 rounded" />
          <div className="w-[80%] h-2 bg-black/5 rounded" />
          <div className="w-full h-2 bg-black/5 rounded" />
          <div className="w-[90%] h-2 bg-black/5 rounded" />
          <div className="mt-auto w-8 h-8 rounded-full bg-brand-red/10" />
        </motion.div>

        {/* Right Page (Fixed) */}
        <div className="absolute left-1/2 w-1/2 h-full bg-white origin-left rounded-r-sm border-l border-black/5 p-4 flex flex-col gap-2">
          <div className="w-full h-2 bg-black/5 rounded" />
          <div className="w-[70%] h-2 bg-black/5 rounded" />
          <div className="w-full h-2 bg-black/5 rounded" />
          <div className="w-[85%] h-2 bg-black/5 rounded" />
          <div className="mt-auto self-end w-8 h-8 rounded-full bg-brand-red/10" />
        </div>

        {/* Front Cover (Opening) */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -170 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute left-1/2 w-1/2 h-full bg-brand-red origin-left rounded-r-lg shadow-2xl flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>
        </motion.div>

        {/* Light Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.5, 0.2], scale: [0, 1.5, 1.2] }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          className="absolute w-40 h-40 bg-brand-red/20 blur-3xl rounded-full z-[-1]"
        />
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: -100, x: [-20, 20, -20] }}
        transition={{ delay: 1.8, duration: 3, repeat: Infinity, ease: "easeOut" }}
        className="absolute text-brand-red text-2xl"
      >
        💡
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: -120, x: [30, -30, 30] }}
        transition={{ delay: 2.2, duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        className="absolute text-brand-red text-xl"
      >
        ✨
      </motion.div>
    </div>
  );
}
