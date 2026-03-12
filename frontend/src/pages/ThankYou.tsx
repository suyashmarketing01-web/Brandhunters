import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-gray px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-3xl p-10 md:p-16 text-center shadow-2xl border border-black/5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        
        <h1 className="text-4xl font-display font-bold mb-4 text-brand-black">Thank You!</h1>
        <p className="text-brand-black/70 text-lg mb-10">
          We've received your information. Our team will get back to you shortly to discuss the next steps.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-brand-black border border-transparent rounded-full hover:bg-brand-red hover:shadow-[0_0_30px_rgba(194,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-white group"
        >
          Return to Home
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
