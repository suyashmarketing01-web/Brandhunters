import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Target, BarChart3, Rocket, CheckCircle2, ShieldCheck, Eye, Users, Sparkles, Trophy, Search, Code, Palette, Video, Star, Settings, Zap, Mail, Phone, MapPin } from 'lucide-react';
import { FaGoogle, FaMeta, FaTiktok, FaLinkedin, FaChartLine, FaCode, FaRobot } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
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

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 overflow-hidden">
        <AnimatedBackground color="#C20000" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white pointer-events-none" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] text-brand-black/10"
          >
            <FaGoogle size={64} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-[15%] text-brand-black/10"
          >
            <FaMeta size={72} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 left-[15%] text-brand-black/10"
          >
            <FaChartLine size={56} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-1/4 right-[20%] text-brand-black/10"
          >
            <FaCode size={60} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-1/2 left-[5%] text-brand-black/10 hidden md:block"
          >
            <FaRobot size={50} />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 text-sm font-medium text-brand-black/80 mb-8 backdrop-blur-sm"
            >
              <Trophy className="w-4 h-4 text-brand-red" />
              <span>We believe in results, not plans.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-8"
            >
              ROI First.<br />
              <span className="text-brand-red">
                Payment Later.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-brand-black/70 max-w-2xl mb-12"
            >
              We operate on a pay-after-performance model for the first 15 days. You only pay when our campaigns generate agreed-upon results—leads, sales, and conversions. Zero risk. Total transparency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-brand-red border border-transparent rounded-full hover:bg-brand-red-hover hover:shadow-[0_0_30px_rgba(194,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-white">
                Start Your Campaign
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-brand-black transition-all duration-300 bg-black/5 border border-black/10 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20 focus:ring-offset-white">
                Book Free Strategy Call
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-brand-black text-white overflow-hidden border-y border-brand-red/20">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Platforms We Master</p>
        </div>
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
          {/* First set */}
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaGoogle size={32} /></span><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaMeta size={32} /></span><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaTiktok size={32} /></span><span className="text-xl font-display font-bold">TikTok Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaLinkedin size={32} /></span><span className="text-xl font-display font-bold">LinkedIn Ads</span></div>
          </div>
          {/* Second set for infinite loop */}
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaGoogle size={32} /></span><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaMeta size={32} /></span><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaTiktok size={32} /></span><span className="text-xl font-display font-bold">TikTok Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaLinkedin size={32} /></span><span className="text-xl font-display font-bold">LinkedIn Ads</span></div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency (Moved to Top) */}
      <section className="py-24 relative overflow-hidden bg-brand-black text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Proven Results. Total Trust.</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              We require an initial discovery meeting to understand your business model. Not all businesses qualify for our performance model—we only partner when we know we can win together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { value: 300, suffix: "%", label: "Increase in Leads", client: "SaaS Client A", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
              { value: 6, suffix: "x", label: "ROI within 3 months", client: "E-commerce Client B", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },
              { value: 45, suffix: "%", label: "Reduction in CPA", client: "B2B Service Client C", image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=600&q=80" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, type: "spring" }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center shadow-lg relative overflow-hidden group hover:border-brand-red/50 transition-colors flex flex-col"
              >
                <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/5 transition-colors duration-500 z-0" />
                
                <div className="relative z-10 w-full h-32 mb-6 rounded-lg overflow-hidden border border-white/10">
                  <img src={stat.image} alt={`${stat.label} dashboard`} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="text-5xl font-display font-black text-brand-red mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-bold mb-4">{stat.label}</div>
                  <div className="text-sm text-white/50 font-mono">{stat.client}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (Updated with PPC focus and new services) */}
      <section id="services" className="py-24 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Core Focus: PPC</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              We specialize in high-ROI paid acquisition. It's what we do best, and it's how we guarantee results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: FaGoogle, title: 'Google Ads (PPC)', desc: 'High-converting search and display campaigns on Google.', anim: 'target' },
              { icon: FaMeta, title: 'Meta Ads', desc: 'Targeted social advertising across Facebook and Instagram.', anim: 'growth' },
              { icon: FaTiktok, title: 'TikTok Ads', desc: 'Engaging, viral video campaigns for modern audiences.', anim: 'viral' },
              { icon: FaLinkedin, title: 'LinkedIn B2B', desc: 'Precision targeting for high-value B2B lead generation.', anim: 'precision' }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group p-8 rounded-2xl bg-white border-2 border-brand-red/20 hover:border-brand-red shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Core Service</div>
                
                {/* Animated background icon for each service */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  {service.anim === 'growth' && <FaChartLine size={120} />}
                  {service.anim === 'viral' && <Zap size={120} />}
                  {service.anim === 'precision' && <ShieldCheck size={120} />}
                </div>

                <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                  <span className="flex items-center justify-center w-7 h-7 text-brand-red group-hover:text-white transition-colors">
                    <service.icon size={28} />
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-brand-black/60 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold mb-4">Full-Stack Digital Solutions</h3>
            <p className="text-brand-black/60 max-w-2xl mx-auto">
              To support our paid campaigns, we offer comprehensive creative and technical services to ensure every click converts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: 'SEO', desc: 'Dominate search rankings with technical and content-driven SEO.', anim: 'search' },
              { icon: Code, title: 'Web Development', desc: 'High-performance, conversion-optimized landing pages and websites.', anim: 'code' },
              { icon: Palette, title: 'Graphic Design', desc: 'Scroll-stopping creatives and brand identity design.', anim: 'design' },
              { icon: Video, title: 'Video Editing', desc: 'Dynamic, short-form and long-form video content for ads.', anim: 'video' }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-2xl bg-white border border-black/5 hover:border-black/20 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Animated background icon for each service */}
                <div className="absolute -bottom-2 -right-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
                  {service.anim === 'search' && <Search size={80} />}
                  {service.anim === 'code' && <Settings size={80} className="animate-spin-slow" />}
                  {service.anim === 'design' && <Palette size={80} />}
                  {service.anim === 'video' && <Video size={80} />}
                </div>

                <div className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center mb-4 group-hover:bg-brand-black group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-5 h-5 text-brand-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-brand-black/60 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section id="reviews" className="py-24 bg-brand-white relative overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Client Success Stories</h2>
              <p className="text-brand-black/70 text-lg">
                Don't just take our word for it. See what our partners have to say about our performance-driven approach.
              </p>
            </div>
            <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-xl border border-black/5 shrink-0">
              <div className="text-6xl font-display font-black text-brand-black">4.9</div>
              <div>
                <div className="flex text-[#FBBC05] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm font-medium text-brand-black/60">Based on 40+ Google Reviews</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-black/10 mx-2" />
              <div className="hidden sm:flex items-center justify-center text-[#4285F4]">
                <FaGoogle size={48} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "CMO, TechFlow", time: "2 weeks ago", text: "Switching to their pay-on-performance model was the best decision we made. They scaled our Google Ads spend while reducing our CPA by 40%. Highly recommended!", initial: "S", color: "bg-blue-500" },
              { name: "David Chen", role: "Founder, Elevate E-com", time: "1 month ago", text: "I was skeptical about the zero-risk promise, but they delivered. The dashboard transparency is incredible, and the ROI speaks for itself.", initial: "D", color: "bg-emerald-500" },
              { name: "Marcus Thorne", role: "Marketing Dir, BuildPro", time: "3 months ago", text: "Finally, an agency that puts their money where their mouth is. They completely revamped our Meta Ads and the lead quality has never been better.", initial: "M", color: "bg-purple-500" }
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }} 
                className="bg-white p-8 rounded-2xl shadow-lg border border-black/5 relative hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute top-8 right-8 text-[#4285F4]">
                  <FaGoogle size={24} />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full ${review.color} text-white flex items-center justify-center text-xl font-bold`}>
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-bold text-brand-black">{review.name}</div>
                    <div className="text-xs text-brand-black/50">{review.time}</div>
                  </div>
                </div>
                <div className="flex text-[#FBBC05] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + (i * 0.1), type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-brand-black/70 text-sm leading-relaxed">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How Our Model Works</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              A transparent, step-by-step process that aligns our incentives with your business growth. We share the accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent -translate-y-1/2 z-0" />

            {[
              { icon: Target, title: 'Define Metrics', desc: 'We set baseline revenue, target growth, ROAS, and time frames.' },
              { icon: BarChart3, title: 'Set Up Tracking', desc: 'Advanced analytics are deployed to track every lead and sale accurately.' },
              { icon: Rocket, title: 'Launch & Optimise', desc: 'Campaigns go live and are continually optimised to exceed baselines.' },
              { icon: CheckCircle2, title: 'Pay on Performance', desc: 'You pay a commission only when results surpass agreed targets.' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-brand-gray border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{step.title}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Why Choose a Performance Agency?</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Traditional agencies charge fixed retainers regardless of results. We believe in shared accountability. We deeply understand your business, profit margins, and customer lifetime value before starting.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: 'Lower Financial Risk', desc: 'You only pay when campaigns succeed. No wasted ad spend on unproven strategies.' },
                  { icon: Eye, title: 'Complete Transparency', desc: 'Every lead and conversion cost is known. No hidden fees or vague reporting.' },
                  { icon: Users, title: 'Agency Accountability', desc: 'Our income is directly tied to your success. We are your dedicated growth partners.' }
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-brand-red/20 blur-[100px] rounded-full" />
              <div className="relative bg-brand-dark border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-red/20 to-transparent opacity-50 blur-3xl" />
                <h3 className="text-2xl font-display font-bold mb-8">The ROI Difference</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">Traditional Agency</span>
                      <span className="text-brand-red font-mono">Fixed Cost</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white/30 w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">ROIFirst Agency</span>
                      <span className="text-brand-red font-mono font-bold">Pay on Success</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-brand-red" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-white/80 italic">
                    "Pay-for-performance advertising ties costs to measurable outcomes rather than fixed fees, ensuring complete transparency and agency accountability."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />

      {/* Namaste / Thank You Section */}
      <section className="py-32 bg-brand-white relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-black/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-red/5 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 flex flex-col items-center relative z-10"
        >
          <motion.div
            animate={{ 
              rotateX: [0, 15, 0],
              y: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-10 text-brand-black drop-shadow-xl"
            style={{ perspective: "1000px" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-32 h-32 md:w-40 md:h-40">
              {/* High quality praying hands / namaste SVG path */}
              <path d="M256 32c-14.8 0-27.5 10.1-31 24.4L199.2 169.1l-36.9-36.9c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l83.6 83.6c-18.7 18.2-30.6 43.6-30.6 71.7v80c0 35.3 28.7 64 64 64h44c35.3 0 64-28.7 64-64v-80c0-28.1-11.9-53.5-30.6-71.7l83.6-83.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-36.9 36.9L287 56.4c-3.5-14.3-16.2-24.4-31-24.4zM224 284.8v128c0 17.7 14.3 32 32 32s32-14.3 32-32v-128c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/>
            </svg>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-brand-black tracking-tight"
          >
            Thanks for Visiting
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-brand-black/70 mb-12 max-w-2xl font-medium"
          >
            With full respect and gratitude. We look forward to building something extraordinary with you.
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="w-32 h-1.5 bg-brand-red rounded-full mx-auto" 
          />
        </motion.div>
      </section>
    </div>
  );
}
