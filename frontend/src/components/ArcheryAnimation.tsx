import { motion } from 'motion/react';

export default function ArcheryAnimation() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Target (Bullseye) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full border-[12px] border-brand-red/20 flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border-[12px] border-brand-red/40 flex items-center justify-center">
            <div className="w-[60%] h-[60%] rounded-full border-[12px] border-brand-red/60 flex items-center justify-center">
              <div className="w-[40%] h-[40%] rounded-full bg-brand-red shadow-[0_0_30px_rgba(194,0,0,0.5)] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ x: -400, y: -200, rotate: 30, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 30, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 1, 
          ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for a "snap" effect
        }}
        className="absolute z-10"
      >
        <div className="relative flex items-center">
          {/* Arrow Shaft */}
          <div className="w-32 h-1 bg-brand-black rounded-full shadow-lg" />
          {/* Arrow Head */}
          <div className="w-4 h-4 bg-brand-black rotate-45 -ml-2" />
          {/* Fletching (Feathers) */}
          <div className="absolute -left-2 flex flex-col gap-1">
            <div className="w-6 h-2 bg-brand-red/60 rounded-sm -rotate-12" />
            <div className="w-6 h-2 bg-brand-red/60 rounded-sm rotate-12" />
          </div>
        </div>
      </motion.div>

      {/* Impact Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="absolute w-20 h-20 rounded-full border-4 border-brand-red z-20"
      />
    </div>
  );
}
