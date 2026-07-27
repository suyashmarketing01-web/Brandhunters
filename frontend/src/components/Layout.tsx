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
  ],
  '/real-estate': [
    { id: 'hero', label: 'Real Estate' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ],
  '/hospital-marketing': [
    { id: 'hero', label: 'Hospital' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ],
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
  const contactLink = ['/', '/course', '/education', '/real-estate', '/hospital-marketing'].includes(location.pathname) ? '#contact' : '/#contact';
  const isIntlPage = location.pathname === '/digital-marketing-uk-us';

  const getSupportBanner = () => {
    return (
      <div id="support-banner" className="bg-brand-black text-white py-2.5 px-4 border-b border-white/10 relative z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="text-white/90">24/7 Support Active</span>
            </div>
            {!isIntlPage && (
              <>
                <div className="hidden sm:block w-px h-3 bg-white/20" />
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-brand-red" />
                  <span className="text-white/70">Team: +91 7798484935</span>
                </div>
              </>
            )}
            {isIntlPage && (
              <>
                <div className="hidden sm:block w-px h-3 bg-white/20" />
                <span className="text-orange-400">🇮🇳 India-Based · Serving 🇬🇧 UK & 🇺🇸 USA</span>
              </>
            )}
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
    if (location.pathname === '/real-estate') {
      return (
        <div className="bg-brand-red text-white text-[10px] font-bold tracking-[0.2em] uppercase py-2 text-center w-full z-[60] relative shadow-inner">
          Brand Hunters Real Estate — Property Marketing Experts
        </div>
      );
    }
    if (location.pathname === '/hospital-marketing') {
      return (
        <div className="bg-brand-red text-white text-[10px] font-bold tracking-[0.2em] uppercase py-2 text-center w-full z-[60] relative shadow-inner">
          Brand Hunters Healthcare — Hospital & Clinic Marketing
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
            ['/education', '/course', '/real-estate', '/hospital-marketing'].includes(location.pathname) ? '76px' : '44px'
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
            {location.pathname === '/real-estate' && <span className="text-brand-black/40 font-display font-normal text-sm sm:text-lg md:text-xl hidden md:inline">| Real Estate</span>}
            {location.pathname === '/hospital-marketing' && <span className="text-brand-black/40 font-display font-normal text-sm sm:text-lg md:text-xl hidden md:inline">| Healthcare</span>}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Agency</Link>
            {/* Industries Dropdown */}
            <div className="relative group">
              <button className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                ['/education','/real-estate','/hospital-marketing'].includes(location.pathname) ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'
              }`}>
                Industries <span className="text-[10px] mt-0.5">▼</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-black/5 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/education" className={`flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-red/5 hover:text-brand-red transition-colors ${location.pathname === '/education' ? 'text-brand-red font-bold' : 'text-brand-black'}`}>
                  🎓 Education
                </Link>
                <Link to="/real-estate" className={`flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-red/5 hover:text-brand-red transition-colors ${location.pathname === '/real-estate' ? 'text-brand-red font-bold' : 'text-brand-black'}`}>
                  🏠 Real Estate
                </Link>
                <Link to="/hospital-marketing" className={`flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-red/5 hover:text-brand-red transition-colors ${location.pathname === '/hospital-marketing' ? 'text-brand-red font-bold' : 'text-brand-black'}`}>
                  🏥 Hospital Marketing
                </Link>
              </div>
            </div>
            <Link to="/course" className={`text-sm font-medium transition-colors ${location.pathname === '/course' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Academy</Link>
            <a href={contactLink} className="text-sm font-medium transition-colors text-brand-black hover:text-brand-red">Contact</a>
            <Link to="/portal/login" className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/portal') ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Client Portal</Link>
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
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/40 mt-2 mb-1">Industries</div>
            <Link to="/education" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors pl-3 ${location.pathname === '/education' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>🎓 Education</Link>
            <Link to="/real-estate" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors pl-3 ${location.pathname === '/real-estate' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>🏠 Real Estate</Link>
            <Link to="/hospital-marketing" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors pl-3 ${location.pathname === '/hospital-marketing' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>🏥 Hospital Marketing</Link>
            <Link to="/course" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname === '/course' ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Academy</Link>
            <a href={contactLink} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-brand-black hover:text-brand-red transition-colors">Contact</a>
            <Link to="/portal/login" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname.startsWith('/portal') ? 'text-brand-red' : 'text-brand-black hover:text-brand-red'}`}>Client Portal</Link>
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
                <li><Link to="/education" className="text-white/70 hover:text-brand-red transition-colors">🎓 Education</Link></li>
                <li><Link to="/real-estate" className="text-white/70 hover:text-brand-red transition-colors">🏠 Real Estate</Link></li>
                <li><Link to="/hospital-marketing" className="text-white/70 hover:text-brand-red transition-colors">🏥 Hospital Marketing</Link></li>
                <li><Link to="/course" className="text-white/70 hover:text-brand-red transition-colors">Academy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                <li className="flex flex-col md:flex-row items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 shrink-0 text-brand-red" />
                  <span>suyashmarketing365@gmail.com</span>
                </li>
                {!isIntlPage && (
                  <li className="flex flex-col md:flex-row items-center gap-3 text-white/70">
                    <Phone className="w-5 h-5 shrink-0 text-brand-red" />
                    <div className="text-center md:text-left">
                      <span>+91 7798484935</span>
                      <p className="text-xs text-brand-red font-bold mt-1">24/7 Support Available</p>
                    </div>
                  </li>
                )}
                {!isIntlPage && (
                  <li className="flex flex-col md:flex-row items-center md:items-start gap-3 text-white/70">
                    <MapPin className="w-5 h-5 shrink-0 text-brand-red mt-1" />
                    <span className="text-sm">
                      1) Blue berry Bulding B301, Hadapsar, Pune<br />
                      2) Behind new st stand plaus, Sangli
                    </span>
                  </li>
                )}
                {isIntlPage && (
                  <li className="flex flex-col md:flex-row items-center md:items-start gap-3 text-white/70">
                    <MapPin className="w-5 h-5 shrink-0 text-brand-red mt-1" />
                    <span className="text-sm">🇮🇳 Pune, India · Serving 🇬🇧 UK & 🇺🇸 USA</span>
                  </li>
                )}
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

      {/* Floating Action Buttons — Desktop: stacked right side, Mobile: horizontal bottom bar */}
      {/* Desktop Floating Buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[100] flex-col gap-3 items-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm border border-brand-red/20 px-3 py-1 rounded-full shadow-lg mb-1"
        >
          <p className="text-[10px] font-bold text-brand-red uppercase tracking-tighter flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            24/7 Support Team Online
          </p>
        </motion.div>
        <motion.a
          href="https://wa.me/917798484935"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="bg-[#25D366] text-white px-5 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group transition-all"
        >
          <FaWhatsapp size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap">WhatsApp Now</span>
        </motion.a>
        {!isIntlPage && (
          <motion.a
            href="tel:+917798484935"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="bg-brand-black text-white px-5 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group transition-all border border-white/10"
          >
            <Phone className="w-5 h-5" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap">Call Now</span>
          </motion.a>
        )}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="bg-brand-red text-white px-5 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group transition-all"
        >
          <Mail className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap text-sm">Enquire Now</span>
        </motion.a>
      </div>

      {/* Mobile Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-brand-black/95 backdrop-blur-md border-t border-white/10 px-2 py-2 safe-bottom"
      >
        <div className="flex items-center justify-around gap-1">
          <a
            href="https://wa.me/917798484935"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 text-[#25D366] active:scale-95 transition-transform flex-1"
          >
            <FaWhatsapp size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wide">WhatsApp</span>
          </a>
          {!isIntlPage && (
            <a
              href="tel:+917798484935"
              className="flex flex-col items-center gap-0.5 text-white active:scale-95 transition-transform flex-1"
            >
              <Phone className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-wide">Call Now</span>
            </a>
          )}
          <a
            href="#contact"
            className="flex items-center justify-center gap-1.5 bg-brand-red text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg active:scale-95 transition-transform flex-1 max-w-[140px]"
          >
            <Mail className="w-4 h-4" />
            Get Quote
          </a>
        </div>
      </motion.div>
    </div>
  );
}
