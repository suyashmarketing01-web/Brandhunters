import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight, Mail, Phone, MapPin, Linkedin, Facebook, Instagram, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import CursorFollower from './CursorFollower';

const sectionsByPath: Record<string, { id: string, label: string }[]> = {
  '/': [
    { id: 'hero', label: 'Agency' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'how-it-works', label: 'Process' },
  ],
  '/course': [
    { id: 'hero', label: 'Academy' },
    { id: 'details', label: 'Details' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'reviews', label: 'Success Stories' },
    { id: 'faq', label: 'FAQ' },
  ],
  '/education': [
    { id: 'hero', label: 'Education' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ]
};

export default function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentSections = sectionsByPath[location.pathname] || [];
  const contactLink = (location.pathname === '/' || location.pathname === '/course' || location.pathname === '/education') ? '#contact' : '/#contact';

  const getSupportBanner = () => {
    return (
      <div id="support-banner" className="bg-brand-black text-white py-2.5 px-4 border-b border-white/10 relative z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="text-white/90">24/7 Support Active</span>
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/20" />
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-brand-red" />
              <span className="text-white/70">Team: +91 7798484935</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#25D366]">
              <FaWhatsapp size={14} />
              <a href="https://wa.me/917798484935" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Support</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getDivisionBanner = () => {
    if (location.pathname === '/education') {
      return (
        <div className="bg-brand-red text-white text-[10px] font-bold tracking-[0.2em] uppercase py-2 text-center w-full z-[60] relative shadow-inner">
          Brand Hunters Education — Marketing for Institutions
        </div>
      );
    }
    if (location.pathname === '/course') {
      return (
        <div className="bg-zinc-900 text-brand-red border-b border-white/5 text-[10px] font-bold tracking-[0.2em] uppercase py-2 text-center w-full z-[60] relative">
          Brand Hunters Academy — Digital Marketing Courses
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-white text-brand-black selection:bg-brand-red selection:text-white">
      <CursorFollower />
      {getSupportBanner()}
      {getDivisionBanner()}
      
      {/* Navigation */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm ${
          isScrolled ? 'py-1' : 'py-2'
        }`}
        style={{ 
          top: isScrolled ? '0' : (
            (location.pathname === '/education' || location.pathname === '/course') ? '76px' : '44px'
          )
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
           <Link to="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
            {/* Icon logo - always visible, scales with scroll */}
            <img 
              src="/images/logo-icon.png" 
              alt="Brand Hunters" 
              className={`transition-all duration-300 w-auto ${isScrolled ? 'h-9 sm:h-10 md:h-11' : 'h-11 sm:h-12 md:h-14'}`} 
            />
            {/* Text logo - hidden on very small mobile, visible on sm+ */}
            <img 
              src="/images/logo-text.png" 
              alt="Brand Hunters Digital Marketing Agency" 
              className={`transition-all duration-300 w-auto hidden sm:block ${isScrolled ? 'h-8 sm:h-10 md:h-14' : 'h-10 sm:h-12 md:h-16'}`} 
            />
            {location.pathname === '/education' && <span className="text-brand-black/40 font-display font-normal text-sm sm:text-lg md:text-xl hidden md:inline">| Education</span>}
            {location.pathname === '/course' && <span className="text-brand-black/40 font-display font-normal text-sm sm:text-lg md:text-xl hidden md:inline">| Academy</span>}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Agency</Link>
            <Link to="/education" className={`text-sm font-medium transition-colors ${location.pathname === '/education' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Education</Link>
            <Link to="/course" className={`text-sm font-medium transition-colors ${location.pathname === '/course' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Academy</Link>
            <a href={contactLink} className="text-sm font-medium transition-colors text-brand-black hover:text-brand-red">Contact</a>
            <Link
              to="/course"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-brand-red border border-transparent rounded-full hover:bg-brand-red-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red"
            >
              Start Growing
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {activeSection && (
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-red animate-blink bg-brand-red/5 px-2 py-1 rounded-full border border-brand-red/10">
                {currentSections.find(s => s.id === activeSection)?.label || activeSection}
              </div>
            )}
            <button
              className="p-2 text-brand-black hover:text-brand-red transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 flex flex-col gap-4 md:hidden shadow-lg"
          >
            {currentSections.length > 0 ? (
              <>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/40 mb-2">Sections</div>
                {currentSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium transition-all duration-300 flex items-center justify-between ${
                      activeSection === section.id 
                        ? 'text-brand-red animate-blink' 
                        : 'text-brand-black hover:text-brand-red'
                    }`}
                  >
                    {section.label}
                    {activeSection === section.id && <span className="w-2 h-2 rounded-full bg-brand-red" />}
                  </a>
                ))}
                <div className="h-px bg-black/5 my-2" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/40 mb-2">Pages</div>
              </>
            ) : null}
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname === '/' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Agency</Link>
            <Link to="/education" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname === '/education' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Education</Link>
            <Link to="/course" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname === '/course' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Academy</Link>
            <a href={contactLink} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-brand-black hover:text-brand-red transition-colors">Contact</a>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-brand-black text-white border-t border-white/10 pt-20 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16 text-center md:text-left">
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="bg-white rounded-2xl p-4 inline-block shadow-lg">
                  <img src="/images/logo-full.png" alt="Brand Hunters Digital Marketing Agency" className="h-20 md:h-24 w-auto" />
                </div>
              </Link>
              <p className="text-brand-red font-medium text-sm mb-6 tracking-wide uppercase">We believe in results, not plans.</p>
              <p className="text-white/70 max-w-md mb-8 mx-auto md:mx-0">
                We operate on a pay-after-performance model for the first 15 days. You only pay when we deliver measurable results. Lower risk, complete transparency, and shared accountability.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://www.facebook.com/share/1Ccia2dq57/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/sg_waterproofing11?igsh=dDJvcmh2dWhhZWdp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Navigation</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white/70 hover:text-brand-red transition-colors">Home</Link></li>
                <li><Link to="/education" className="text-white/70 hover:text-brand-red transition-colors">Education</Link></li>
                <li><Link to="/course" className="text-white/70 hover:text-brand-red transition-colors">Academy</Link></li>
                <li><a href="#" className="text-white/70 hover:text-brand-red transition-colors">Services</a></li>
                <li><a href="#" className="text-white/70 hover:text-brand-red transition-colors">Case Studies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                <li className="flex flex-col md:flex-row items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 shrink-0 text-brand-red" />
                  <span>suyashmarketing365@gmail.com</span>
                </li>
                <li className="flex flex-col md:flex-row items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5 shrink-0 text-brand-red" />
                  <div className="text-center md:text-left">
                    <span>+91 7798484935</span>
                    <p className="text-xs text-brand-red font-bold mt-1">24/7 Support Available</p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row items-center md:items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 shrink-0 text-brand-red mt-1" />
                  <span className="text-sm">
                    1) Blue berry Bulding B301, Hadapsar, Pune<br />
                    2) Behind new st stand plaus, Sangli
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Locations</h4>
              <ul className="space-y-4">
                <li><Link to="/digital-marketing-agency-pune" className="text-white/70 hover:text-brand-red transition-colors font-medium">Digital Marketing Pune</Link></li>
                <li><Link to="/digital-marketing-agency-mumbai" className="text-white/70 hover:text-brand-red transition-colors font-medium">Digital Marketing Mumbai</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Brand Hunters. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-3 md:bottom-6 md:right-6 z-[100] flex flex-col gap-2 md:gap-3 items-end">
        {/* Support Badge - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:block bg-white/90 backdrop-blur-sm border border-brand-red/20 px-3 py-1 rounded-full shadow-lg mb-1"
        >
          <p className="text-[10px] font-bold text-brand-red uppercase tracking-tighter flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            24/7 Support Team Online
          </p>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/917798484935"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="bg-[#25D366] text-white p-2.5 md:px-5 md:py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group transition-all"
        >
          <FaWhatsapp size={20} className="md:w-6 md:h-6" />
          <span className="hidden md:inline max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap">WhatsApp Now</span>
        </motion.a>

        {/* Call Button */}
        <motion.a
          href="tel:+917798484935"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="bg-brand-black text-white p-2.5 md:px-5 md:py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group transition-all border border-white/10"
        >
          <Phone className="w-5 h-5" />
          <span className="hidden md:inline max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap">Call Now</span>
        </motion.a>

        {/* Enquire Button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="bg-brand-red text-white p-2.5 md:px-5 md:py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group transition-all"
        >
          <Mail className="w-5 h-5" />
          <span className="hidden md:inline max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap text-sm">Enquire Now</span>
        </motion.a>
      </div>
    </div>
  );
}
