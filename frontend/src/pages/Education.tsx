import { motion, useInView } from 'motion/react';
import { GraduationCap, Users, Target, BarChart3, Megaphone, Camera, Search, MessageSquare, ArrowRight, CheckCircle2, Sparkles, BookOpen, Lightbulb, Pencil, Rocket } from 'lucide-react';
import { FaGoogle, FaMeta, FaTiktok, FaLinkedin } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import TrustBadges from '../components/TrustBadges';
import WorkspacePhotos from '../components/WorkspacePhotos';
import TeamShowcase from '../components/TeamShowcase';
import { useRef } from 'react';

export default function Education() {
  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Admission Campaigns",
      description: "High-performance lead generation campaigns across Meta, Google, and LinkedIn to fill your seats with qualified students.",
      features: ["Lead Generation", "Retargeting", "Conversion Tracking"]
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Social Media Management",
      description: "Showcase your campus life, achievements, and culture to build a strong community and attract prospective students.",
      features: ["Content Strategy", "Community Management", "Influencer Collabs"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Educational SEO",
      description: "Rank for the right keywords. Ensure your institution is the first choice when students search for courses in your niche.",
      features: ["Local SEO", "Keyword Research", "Content Marketing"]
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Campus Branding",
      description: "Professional photography, campus tours, and video testimonials that capture the essence of your institution.",
      features: ["Virtual Tours", "Student Testimonials", "Event Coverage"]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Lead Nurturing & CRM",
      description: "Don't let leads go cold. We implement CRM systems and automation to nurture students from inquiry to enrollment.",
      features: ["WhatsApp Automation", "Email Marketing", "CRM Setup"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data & Analytics",
      description: "Transparent reporting on campaign performance, cost per lead, and enrollment ROI.",
      features: ["ROI Tracking", "Performance Audits", "Market Research"]
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black" style={{ perspective: '1200px' }}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-40 overflow-hidden bg-brand-white">
        {/* Theme Blurred Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/education/strategy.png" 
            alt="Education Background" 
            className="w-full h-full object-cover blur-sm opacity-20 scale-110"
          />
        </div>
        
        <AnimatedBackground color="#C20000" />
        
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                z: -500,
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                rotateX: Math.random() * 360,
                rotateY: Math.random() * 360
              }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                z: [ -500, 100, -500],
                rotateX: [0, 360],
                rotateY: [0, 360],
                x: [Math.random() * 1000 - 500, Math.random() * 1000 - 500],
                y: [Math.random() * 1000 - 500, Math.random() * 1000 - 500],
              }}
              transition={{ 
                duration: 15 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-32 h-32 border-2 border-brand-red/10 rounded-3xl"
              style={{ transformStyle: 'preserve-3d' }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white pointer-events-none z-[1]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16" style={{ transformStyle: 'preserve-3d' }}>
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: -50, z: 100, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, z: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 inline-block"
            >
              <div className="px-6 py-3 rounded-2xl bg-brand-red text-white shadow-[0_20px_50px_rgba(194,0,0,0.3)] flex items-center gap-3 animate-pulse">
                <span className="font-bold tracking-tight">Risk-Free Start: First take a 15-Day Free Trial. Pay only after you see the work and results.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, z: 50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold mb-8 uppercase tracking-wider"
            >
              <GraduationCap className="w-4 h-4" />
              Marketing for Educational Institutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50, z: 200, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, z: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "backOut" }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1] mb-6 sm:mb-8"
            >
              Fill Your Classrooms with <br />
              <span className="text-brand-red relative">
                Qualified Students
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-brand-red/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-brand-black/70 max-w-2xl mb-12 leading-relaxed"
            >
              We help Schools, Colleges, and Universities scale their admissions through 
              data-driven performance marketing and strategic social media management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, z: 100 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, translateZ: 20 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-brand-red text-white rounded-2xl font-bold text-xl hover:bg-brand-red-hover transition-all shadow-[0_20px_40px_rgba(194,0,0,0.2)] flex items-center justify-center gap-3"
              >
                Get Admission Strategy <ArrowRight className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#services" 
                whileHover={{ scale: 1.05, translateZ: 20 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-brand-black border border-black/10 rounded-2xl font-bold text-xl hover:bg-black/5 transition-all flex items-center justify-center gap-3"
              >
                Explore Services
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-black text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">50+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Institutions Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">15k+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Leads Generated</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">35%</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Avg. Admission Growth</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">₹0</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Setup Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-brand-black text-white overflow-hidden border-y border-brand-red/20">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Platforms We Master For Admissions</p>
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

      {/* Education Trust Badges & Workspace Photos */}
      <TrustBadges type="education" />
      <WorkspacePhotos type="education" />
      <TeamShowcase type="education" />

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-24 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Tailored Solutions for Education</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              From primary schools to professional universities, we provide the tools and strategies 
              needed to thrive in a competitive educational landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ transformStyle: 'preserve-3d' }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, z: -100 }}
                whileInView={{ opacity: 1, y: 0, z: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotateY: 10, 
                  rotateX: -5, 
                  z: 50,
                  boxShadow: "0 30px 60px rgba(194,0,0,0.15)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="p-8 rounded-[2.5rem] bg-white border border-black/5 hover:border-brand-red/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                {/* Background Icons for Education Services */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  {index % 3 === 1 && <Lightbulb size={120} />}
                  {index % 3 === 2 && <Pencil size={120} />}
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-brand-black/70 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-sm font-semibold text-brand-black/80">
                        <CheckCircle2 className="w-5 h-5 text-brand-red" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Why Educational Institutions Trust Us</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Deep Industry Expertise</h4>
                    <p className="text-brand-black/70">We understand the academic calendar, student psychology, and the decision-making process of parents.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Lead Quality Focus</h4>
                    <p className="text-brand-black/70">We don't just deliver leads; we deliver prospective students who are genuinely interested in your courses.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">End-to-End Support</h4>
                    <p className="text-brand-black/70">From the first click to the final enrollment, we support your admissions team with tools and training.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Pay After Results</h4>
                    <p className="text-brand-black/70 font-bold">First take a 15-day free trial. Pay only after you see the work and results. We believe in earning your trust through performance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: -20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: -10, rotateX: 5, z: 30 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students on campus" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, z: 50 }}
                whileInView={{ opacity: 1, scale: 1, z: 100 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -left-8 p-8 bg-brand-red text-white rounded-3xl shadow-2xl max-w-xs"
                style={{ transformZ: '100px' }}
              >
                <p className="text-lg font-bold mb-2">"Our admissions increased by 40% in just one season."</p>
                <p className="text-sm opacity-80">- Director, Leading International School</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-24 relative bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Admission Growth Process</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              A transparent, step-by-step process that aligns our incentives with your institution's growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent -translate-y-1/2 z-0" />

            {[
              { icon: Target, title: 'Define Targets', desc: 'We set admission goals, target demographics, and required cost-per-lead.' },
              { icon: BarChart3, title: 'Build Funnels', desc: 'High-converting landing pages and tracking systems are deployed.' },
              { icon: Rocket, title: 'Launch Campaigns', desc: 'Targeted ads go live across Google, Meta, and LinkedIn.' },
              { icon: CheckCircle2, title: 'Nurture & Enroll', desc: 'We help your team nurture leads until they successfully enroll.' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gray flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{step.title}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
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
              <path d="M256 32c-14.8 0-27.5 10.1-31 24.4L199.2 169.1l-36.9-36.9c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l83.6 83.6c-18.7 18.2-30.6 43.6-30.6 71.7v80c0 35.3 28.7 64 64 64h44c35.3 0 64-28.7 64-64v-80c0-28.1-11.9-53.5-30.6-71.7l83.6-83.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-36.9 36.9L287 56.4c-3.5-14.3-16.2-24.4-31-24.4zM224 284.8v128c0 17.7 14.3 32 32 32s32-14.3 32-32v-128c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/>
            </svg>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 text-brand-black tracking-tight"
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
            With full respect and gratitude. We look forward to partnering with your institution.
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
