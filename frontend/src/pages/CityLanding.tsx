import { motion, useInView } from 'motion/react';
import { ArrowRight, ShieldCheck, Eye, Users, Search, Code, Star, TrendingUp, Clock, Award, Zap, ChevronDown, CheckCircle2, Phone, MessageSquare, BarChart3, Target, Rocket } from 'lucide-react';
import { FaGoogle, FaMeta, FaWhatsapp } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import TrustBadges from '../components/TrustBadges';
import WorkspacePhotos from '../components/WorkspacePhotos';
import SEO from '../components/SEO';
import { useState, useEffect, useRef } from 'react';

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix, prefix = '' }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = value / steps;
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Typewriter Effect ─── */
function TypeWriter({ words, className }: { words: string[]; className?: string }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentChar < word.length) {
          setCurrentChar(c => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentChar > 0) {
          setCurrentChar(c => c - 1);
        } else {
          setIsDeleting(false);
          setCurrentWord(w => (w + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [currentChar, isDeleting, currentWord, words]);

  return (
    <span className={className}>
      {words[currentWord].substring(0, currentChar)}
      <span className="animate-blink text-brand-red">|</span>
    </span>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-black/10 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className="font-bold text-lg pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 text-brand-red ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-brand-black/70 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function CityLanding({ city }: { city: string }) {
  const title = `Best Digital Marketing Agency in ${city} | Brand Hunters — Pay After Performance`;
  const description = `Looking for the #1 digital marketing agency in ${city}? Brand Hunters delivers pay-after-performance Google Ads, Meta Ads, SEO & Web Development. Stop paying retainers—start paying for results. Free strategy call.`;
  const keywords = `digital marketing agency in ${city}, seo company in ${city}, best seo expert in ${city}, performance marketing agency ${city}, google ads agency ${city}, meta ads agency ${city}, web development company ${city}, ppc agency ${city}, social media marketing ${city}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Brand Hunters Digital Marketing ${city}`,
    "image": "https://brandhunters.com/logo.png",
    "description": description,
    "address": { "@type": "PostalAddress", "addressLocality": city, "addressCountry": "IN" },
    "telephone": "+91-7798484935",
    "url": `https://brandhunters.com/digital-marketing-agency-${city.toLowerCase()}`,
    "priceRange": "$$$",
    "areaServed": city,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "47" },
    "serviceArea": { "@type": "City", "name": city }
  };

  const cityHighlights: Record<string, { landmark: string; businesses: string; tagline: string }> = {
    Pune: { landmark: "IT Hub of Maharashtra", businesses: "SaaS, EdTech, Real Estate, Restaurants", tagline: "From Hinjewadi to Kothrud — we dominate every search result." },
    Mumbai: { landmark: "Financial Capital of India", businesses: "Finance, E-commerce, Healthcare, Hospitality", tagline: "From Andheri to Colaba — your customers are searching, we make sure they find you." },
  };

  const info = cityHighlights[city] || cityHighlights['Pune'];

  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black">
      <SEO title={title} description={description} keywords={keywords} canonical={`/digital-marketing-agency-${city.toLowerCase()}`} schema={schema} />
      
      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-20 overflow-hidden bg-brand-white">
        {/* Theme Blurred Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/agency/strategy.png" 
            alt="Agency Background" 
            className="w-full h-full object-cover blur-xl sm:blur-2xl opacity-30 scale-105 mix-blend-multiply"
          />
        </div>
        
        <AnimatedBackground color="#C20000" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white pointer-events-none z-0" />
        
        {/* Floating social proof pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute top-36 sm:top-40 right-4 sm:right-12 z-20 glass-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2"
        >
          <div className="flex -space-x-2">
            {['bg-blue-500', 'bg-emerald-500', 'bg-purple-500'].map((c, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white text-white text-[10px] font-bold flex items-center justify-center`}>
                {['S', 'D', 'M'][i]}
              </div>
            ))}
          </div>
          <span className="text-xs font-bold text-brand-black/80">47+ businesses trust us</span>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="animate-pulse-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-sm font-bold text-brand-red mb-8"
          >
            <Award className="w-4 h-4" />
            <span>Rated #1 in {city} — {info.landmark}</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-center tracking-tighter leading-[1.05] mb-6"
          >
            Dominate {city} With<br />
            <span className="text-gradient-red">
              <TypeWriter words={['Google Ads', 'Meta Ads', 'SEO', 'Web Design']} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-brand-black/70 text-center max-w-3xl mb-8"
          >
            {info.tagline} We're a performance marketing agency — <strong>you pay only after we generate real leads, sales, and conversions.</strong> Zero risk.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-10 text-xs font-bold text-brand-black/50"
          >
            {[
              { icon: ShieldCheck, label: 'Zero Risk Model' },
              { icon: Clock, label: 'Results in 15 Days' },
              { icon: Star, label: '4.9★ Google Rating' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-black/5 px-3 py-1.5 rounded-full">
                <badge.icon className="w-3.5 h-3.5 text-brand-red" />
                {badge.label}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
          >
            <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-brand-red rounded-full hover:bg-brand-red-hover hover:shadow-[0_0_40px_rgba(194,0,0,0.5)] animate-pulse-glow">
              Get Free Strategy Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://wa.me/917798484935" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-brand-black transition-all duration-300 bg-black/5 border border-black/10 rounded-full hover:bg-black/10 gap-2">
              <span className="text-[#25D366] flex items-center justify-center">
                <FaWhatsapp size={20} />
              </span>
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-black/30"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ═══════════ LIVE STATS BAR ═══════════ */}
      <section className="py-6 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
          {[
            { value: 300, suffix: '%', label: 'Avg. Lead Increase' },
            { value: 47, suffix: '+', label: 'Happy Clients' },
            { value: 6, suffix: 'x', label: 'Avg. ROI Delivered' },
            { value: 15, suffix: ' Days', label: 'To First Results' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-display font-black text-brand-red animate-count-pulse">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Agency Trust Badges & Workspace Photos */}
      <TrustBadges type="agency" />
      <WorkspacePhotos type="agency" />

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="py-24 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">
              What We Do In {city}
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-display font-bold mb-6">
              Full-Stack Digital Growth for <span className="text-gradient-red">{city} Businesses</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-brand-black/60 max-w-2xl mx-auto text-lg">
              We specialize in {info.businesses} businesses across {city}. Our team builds custom strategies that deliver measurable results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: `SEO in ${city}`, desc: `Rank #1 on Google for "${city}" searches. We dominate local SEO with technical optimization and high-authority backlinks.`, tag: 'Most Popular', highlight: true },
              { icon: FaGoogle, title: 'Google Ads (PPC)', desc: 'Capture high-intent buyers instantly. Our campaigns achieve 6x ROAS consistently.', tag: 'High ROI' },
              { icon: FaMeta, title: 'Meta & Instagram Ads', desc: 'Scroll-stopping creatives + precision targeting = leads that convert into paying customers.', tag: 'Lead Gen' },
              { icon: Code, title: 'Web Development', desc: 'Lightning-fast, mobile-first websites engineered for conversions with A/B testing built-in.', tag: 'Conversion' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group relative p-8 rounded-3xl bg-white border-2 ${service.highlight ? 'border-brand-red/30 shadow-xl' : 'border-black/5'} hover:border-brand-red/50 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {service.tag && (
                  <div className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${service.highlight ? 'bg-brand-red text-white' : 'bg-black/5 text-brand-black/60'}`}>
                    {service.tag}
                  </div>
                )}
                <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <service.icon size={120} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-brand-red text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Our Process</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">From Zero to Hero in 4 Steps</h2>
            <p className="text-brand-black/60 max-w-2xl mx-auto">No fluff, no long contracts. Here's exactly how we scale your {city} business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent -translate-y-1/2 z-0" />
            {[
              { icon: Target, title: 'Discovery Call', desc: 'We learn your business, margins, and goals. Not all businesses qualify.', step: '01' },
              { icon: BarChart3, title: 'Strategy & Setup', desc: 'Custom campaign architecture with conversion tracking on every touchpoint.', step: '02' },
              { icon: Rocket, title: 'Launch & Scale', desc: 'Campaigns go live. Daily optimization. Weekly reporting. Full transparency.', step: '03' },
              { icon: TrendingUp, title: 'Pay On Results', desc: 'You pay a commission ONLY when we exceed agreed-upon targets.', step: '04' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 bg-brand-gray rounded-3xl p-8 text-center border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group"
              >
                <div className="text-6xl font-display font-black text-brand-red/10 group-hover:text-brand-red/20 transition-colors absolute top-4 right-6">{step.step}</div>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-brand-black/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY US + SOCIAL PROOF ═══════════ */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Why {city} Businesses Choose Us</div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">We Don't Charge Until <span className="text-brand-red">You Profit.</span></h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                As the leading digital marketing agency in {city}, we differentiate ourselves by taking ALL the financial risk. Traditional agencies charge ₹50K-₹2L/month regardless of results. We only earn when you earn.
              </p>
              
              <div className="space-y-5">
                {[
                  { icon: ShieldCheck, title: 'Zero Risk, Zero Retainers', desc: 'No upfront payments. We invest our time and expertise first.' },
                  { icon: Eye, title: `${city} Market Experts`, desc: `Deep understanding of the ${city} market, consumer behavior, and local competition.` },
                  { icon: Users, title: 'Dedicated Growth Squad', desc: 'A personal team of strategists, designers, and ad managers tied to your pipeline.' },
                  { icon: Zap, title: 'Real-Time Dashboard', desc: 'Track every lead, every click, every rupee spent — 24/7 live reporting.' },
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-red/20 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                      <p className="text-white/50 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Comparison Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-red/20 blur-[80px] rounded-full" />
              <div className="relative glass rounded-3xl p-8 overflow-hidden shadow-2xl">
                <h3 className="text-2xl font-display font-bold mb-8">Traditional vs. Brand Hunters</h3>
                
                <div className="space-y-6">
                  {[
                    { label: 'Upfront Cost', trad: '₹50K - ₹2L/mo', us: '₹0', usColor: 'text-emerald-400' },
                    { label: 'Risk', trad: '100% on you', us: '0% on you', usColor: 'text-emerald-400' },
                    { label: 'Reporting', trad: 'Monthly PDF', us: 'Live Dashboard 24/7', usColor: 'text-emerald-400' },
                    { label: 'Accountability', trad: 'None', us: 'Revenue-Tied', usColor: 'text-emerald-400' },
                    { label: 'Results Timeline', trad: '3-6 months', us: '15 days', usColor: 'text-emerald-400' },
                  ].map((row, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="grid grid-cols-3 gap-4 text-sm border-b border-white/5 pb-4"
                    >
                      <div className="text-white/40 font-medium">{row.label}</div>
                      <div className="text-white/30 line-through">{row.trad}</div>
                      <div className={`${row.usColor} font-bold`}>{row.us}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-brand-red/10 border border-brand-red/20 rounded-2xl">
                  <p className="text-sm text-white/80 font-medium flex items-start gap-2">
                    <span className="text-brand-red text-lg">🔥</span>
                    <span>Demand is extremely high. We only onboard <strong className="text-white">3 new {city} businesses</strong> per month to ensure quality.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Reviews */}
          <div className="mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-display font-bold mb-2">What {city} Clients Say</h3>
                <p className="text-white/50">Real reviews from real businesses we've scaled.</p>
              </div>
              <div className="flex items-center gap-4 glass rounded-2xl p-4">
                <div className="text-4xl font-display font-black">4.9</div>
                <div>
                  <div className="flex text-[#FBBC05] mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                  <div className="text-xs text-white/40 font-medium">47 Google Reviews</div>
                </div>
                <span className="text-[#4285F4] ml-2 flex items-center justify-center">
                  <FaGoogle size={32} />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Priya Sharma", role: `Founder, ${city} EdTech Startup`, text: "They promised results in 15 days and delivered in 10. Our lead cost dropped by 60% and quality improved dramatically. Best agency decision we ever made.", initial: "P", color: "bg-pink-500" },
                { name: "Rahul Deshmukh", role: `CEO, ${city} Real Estate`, text: "Switched from a ₹1.5L/month retainer agency to Brand Hunters. Within 3 weeks, we generated more qualified leads than the previous agency did in 3 months.", initial: "R", color: "bg-blue-500" },
                { name: "Ananya Kulkarni", role: `Marketing Head, ${city} SaaS`, text: "The transparency is unreal. Live dashboard, daily updates, and they genuinely care about our ROI. It's like having an in-house team for a fraction of the cost.", initial: "A", color: "bg-emerald-500" },
              ].map((review, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="absolute top-6 right-6 text-[#4285F4] opacity-30 group-hover:opacity-60 transition-opacity">
                    <FaGoogle size={20} />
                  </div>
                  <div className="flex text-[#FBBC05] mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className={`w-10 h-10 rounded-full ${review.color} text-white flex items-center justify-center text-sm font-bold`}>{review.initial}</div>
                    <div>
                      <div className="font-bold text-sm">{review.name}</div>
                      <div className="text-xs text-white/40">{review.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Common Questions</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">FAQs About Digital Marketing in {city}</h2>
            <p className="text-brand-black/60">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-4">
            <FAQItem
              question={`How much does digital marketing cost in ${city}?`}
              answer={`Most agencies in ${city} charge ₹30,000 - ₹2,00,000/month as fixed retainers regardless of results. At Brand Hunters, we operate on a pay-after-performance model — you only pay when we deliver measurable leads and sales. This means zero upfront cost and zero financial risk for you.`}
            />
            <FAQItem
              question="How quickly can I see results?"
              answer="We guarantee visible results within the first 15 days of campaign launch. Our Google Ads campaigns typically start generating leads within 48-72 hours. SEO results build over 2-3 months for sustained organic growth."
            />
            <FAQItem
              question={`Why should I choose Brand Hunters over other agencies in ${city}?`}
              answer={`Simple: we put skin in the game. Unlike other agencies in ${city} that charge fixed fees, we only earn when you earn. Our income is directly tied to your revenue growth. This means we're genuinely motivated to maximize your ROI every single day.`}
            />
            <FAQItem
              question="What industries do you work with?"
              answer={`We work with ${info.businesses} businesses and more across ${city}. We have deep expertise in both B2B and B2C verticals. During our discovery call, we assess fit — we only take on clients where we're confident we can deliver exceptional results.`}
            />
            <FAQItem
              question="Is there a minimum contract period?"
              answer="No long-term contracts. We believe in earning your business every single month. If we don't deliver, you don't pay — and you're free to walk away at any time. That's the Brand Hunters promise."
            />
          </div>
        </div>
      </section>

      {/* ═══════════ URGENCY CTA ═══════════ */}
      <section className="py-16 bg-brand-red text-white relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer opacity-30" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Your Competitors in {city} Are Already Advertising.
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Every day you wait, they're capturing your potential customers. Let's change that — start your free strategy call today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-white text-brand-red rounded-full hover:bg-white/90 hover:shadow-xl transition-all group">
                Claim Your Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="tel:+917798484935" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all gap-2">
                <Phone className="w-5 h-5" />
                Call: +91 7798484935
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <ContactForm />
    </div>
  );
}
