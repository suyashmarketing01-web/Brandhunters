import { motion } from 'motion/react';
import { Users, Target, BarChart3, Megaphone, Calendar, Phone, ArrowRight, CheckCircle2, Rocket, Hospital, ShieldCheck, Star, Clock } from 'lucide-react';
import { FaGoogle, FaMeta, FaInstagram, FaYoutube } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import TrustBadges from '../components/TrustBadges';
import WorkspacePhotos from '../components/WorkspacePhotos';
import TeamShowcase from '../components/TeamShowcase';

export default function HospitalMarketing() {
  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Patient Lead Generation",
      description: "High-intent patient campaigns on Google Search and Meta Ads targeting people searching for your specialty — OPD, maternity, ortho, and more.",
      features: ["OPD Appointment Campaigns", "Specialty Department Ads", "Emergency Care Awareness"]
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Social Media Marketing",
      description: "Build trust through doctor reels, patient success stories, health awareness content, and festive health camp promotions.",
      features: ["Doctor Profile Reels", "Health Awareness Posts", "Health Camp Promotions"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Google-Verified Healthcare Marketing",
      description: "NABH/JCI compliant campaigns. We follow Google's healthcare advertising policies so your ads are never taken down.",
      features: ["NABH/JCI Compliant", "Google Health Certified", "Compliant Ad Copy"]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Appointment Booking Campaigns",
      description: "Drive direct appointments via WhatsApp, Google, and your website with integrated booking funnels that work 24/7.",
      features: ["WhatsApp Booking Automation", "Google Appointment Links", "Website Funnel Setup"]
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call & Lead Management",
      description: "Never miss a patient inquiry. We set up call tracking, auto-responses, and CRM to manage every lead from click to consultation.",
      features: ["Call Tracking", "Auto-Reply Bots", "CRM Integration"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "ROI & Analytics Reporting",
      description: "Track cost per appointment, department-wise performance, and monthly patient acquisition metrics with full transparency.",
      features: ["Cost-per-Patient Tracking", "Department Analytics", "Monthly Reports"]
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black" style={{ perspective: '1200px' }}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-40 overflow-hidden bg-brand-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1400"
            alt="Hospital Background"
            className="w-full h-full object-cover blur-sm opacity-15 scale-110"
            referrerPolicy="no-referrer"
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
                z: [-500, 100, -500],
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16" style={{ transformStyle: 'preserve-3d' }}>
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold mb-6 uppercase tracking-wider"
            >
              <Hospital className="w-4 h-4" />
              Hospital & Clinic Marketing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[1.05] mb-6"
            >
              Fill OPD &{' '}<br />
              <span className="text-brand-red">Hospital Beds.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-brand-black/70 max-w-lg mb-8 leading-relaxed"
            >
              500+ patient appointments in 60 days — guaranteed. NABH-compliant campaigns across Google & Meta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-brand-red text-white rounded-2xl font-bold text-lg hover:bg-brand-red-hover transition-all shadow-[0_20px_40px_rgba(194,0,0,0.2)] flex items-center justify-center gap-3"
              >
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex items-center gap-6 text-sm text-brand-black/50 font-medium"
            >
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Free ₹25K Audit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Only 3 Slots/City</span>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-xl lg:max-w-none"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] border-4 border-white/80">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                alt="Modern hospital building"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white rounded-2xl shadow-2xl p-5 border border-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-brand-black">500+</p>
                  <p className="text-xs text-brand-black/50 font-medium">Hospitals Served</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-4 -right-4 md:-right-8 bg-brand-red text-white rounded-2xl shadow-2xl px-5 py-3"
            >
              <p className="text-sm font-bold">70% Patient Growth</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-black text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">500+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Hospitals Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">70%</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Avg. Patient Growth</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">₹20M+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Ad Spend Managed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">₹0</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Setup Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Marquee */}
      <section className="py-12 bg-brand-black text-white overflow-hidden border-y border-brand-red/20">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Platforms & Certifications We Use for Healthcare Marketing</p>
        </div>
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaGoogle size={32} /><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaMeta size={32} /><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaInstagram size={32} /><span className="text-xl font-display font-bold">Instagram</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaYoutube size={32} /><span className="text-xl font-display font-bold">YouTube</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><ShieldCheck size={32} /><span className="text-xl font-display font-bold">NABH Compliant</span></div>
          </div>
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaGoogle size={32} /><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaMeta size={32} /><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaInstagram size={32} /><span className="text-xl font-display font-bold">Instagram</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaYoutube size={32} /><span className="text-xl font-display font-bold">YouTube</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><ShieldCheck size={32} /><span className="text-xl font-display font-bold">NABH Compliant</span></div>
          </div>
        </div>
      </section>

      <TrustBadges type="hospital" />
      <WorkspacePhotos type="hospital" />
      <TeamShowcase type="hospital" />

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-24 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Complete Hospital Marketing Solutions</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              From OPD appointment drives to specialty department campaigns — we help hospitals and clinics build a full patient acquisition system.
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
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 rounded-[2.5rem] bg-white border border-black/5 hover:border-brand-red/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  {index % 3 === 1 && <Hospital size={120} />}
                  {index % 3 === 2 && <Star size={120} />}
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
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Why 50+ Hospitals Trust Brand Hunters</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Google-Verified Healthcare Experts</h4>
                    <p className="text-brand-black/70">We are Google Partners with certified expertise in healthcare advertising — compliant, effective, and ethical campaigns.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">NABH/JCI Compliant Campaigns</h4>
                    <p className="text-brand-black/70">All our campaigns follow healthcare advertising standards — your hospital's reputation stays protected at all times.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Department-Specific Strategies</h4>
                    <p className="text-brand-black/70">From maternity to orthopaedics — we run separate, targeted campaigns for each specialty to maximize appointment volume.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">500 Appointments or Don't Pay</h4>
                    <p className="text-brand-black/70 font-bold">Get 500+ patient appointments in 60 days — or we work for free until you do. That's our performance guarantee.</p>
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
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000"
                  alt="Hospital team"
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
                <p className="text-lg font-bold mb-2">"OPD appointments doubled in 45 days. Remarkable results."</p>
                <p className="text-sm opacity-80">- Medical Director, 200-Bed Hospital, Pune</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-24 relative bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Patient Acquisition Process</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              A proven 4-step system to consistently fill your OPD and specialty departments with patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent -translate-y-1/2 z-0" />
            {[
              { icon: Target, title: 'Free Audit', desc: 'We audit your current online presence, reviews, and ad accounts to identify growth opportunities.' },
              { icon: Rocket, title: 'Launch Campaigns', desc: 'Department-specific ad campaigns go live across Google, Meta, and YouTube targeting local patients.' },
              { icon: Phone, title: 'Capture & Nurture', desc: 'Every inquiry is captured via WhatsApp/call and nurtured with automated follow-ups until they book.' },
              { icon: Users, title: 'Scale What Works', desc: 'We scale your best-performing campaigns and expand to more specialties as appointment volume grows.' }
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

      <ContactForm />

      {/* Closing Section */}
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
            animate={{ rotateX: [0, 15, 0], y: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-10 text-brand-black drop-shadow-xl"
            style={{ perspective: "1000px" }}
          >
            <Hospital className="w-32 h-32 md:w-40 md:h-40 text-brand-red/20" />
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
            With full respect and gratitude. We look forward to helping your hospital serve more patients.
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
