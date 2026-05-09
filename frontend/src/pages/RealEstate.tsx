import { motion } from 'motion/react';
import { Home, Users, Target, BarChart3, Megaphone, Camera, Search, MessageSquare, ArrowRight, CheckCircle2, Rocket, Building2, MapPin, TrendingUp } from 'lucide-react';
import { FaGoogle, FaMeta, FaInstagram, FaYoutube } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import TrustBadges from '../components/TrustBadges';
import WorkspacePhotos from '../components/WorkspacePhotos';
import TeamShowcase from '../components/TeamShowcase';

export default function RealEstate() {
  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Property Lead Generation",
      description: "High-intent buyer & tenant leads through Google Search, Meta Ads, and YouTube campaigns targeting serious property seekers in your city.",
      features: ["Buyer Lead Campaigns", "Tenant Lead Generation", "Investor Targeting"]
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Social Media Marketing",
      description: "Showcase your properties with stunning reels, virtual tours, and project launches that stop the scroll and drive inquiries.",
      features: ["Property Reels", "Project Launch Campaigns", "Instagram & Facebook Ads"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Real Estate SEO",
      description: "Rank on top when buyers search 'flats in Mumbai', '2BHK in Pune', or your project name. Own your local search results.",
      features: ["Local SEO", "Project Page Optimization", "Google My Business"]
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Property Photography & Tours",
      description: "Professional property shoots, 3D virtual walkthroughs, and drone footage that make your listings stand out from the competition.",
      features: ["Virtual Walkthroughs", "Drone Videography", "3D Floor Plans"]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Lead Nurturing & CRM",
      description: "We set up WhatsApp automation and CRM systems to follow up with every lead automatically until they're ready to buy.",
      features: ["WhatsApp Automation", "CRM Integration", "Follow-up Sequences"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Know exactly where every lead came from, your cost per site visit, and your campaign ROI with transparent monthly reports.",
      features: ["Cost-per-Lead Tracking", "Site Visit Attribution", "ROI Reporting"]
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black" style={{ perspective: '1200px' }}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-40 overflow-hidden bg-brand-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1400"
            alt="Real Estate Background"
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
              <Building2 className="w-4 h-4" />
              Real Estate Marketing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[1.05] mb-6"
            >
              Sell Properties{' '}<br />
              <span className="text-brand-red">Faster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-brand-black/70 max-w-lg mb-8 leading-relaxed"
            >
              Performance marketing for Builders & Agents. Qualified leads, site visits, and closures — across Pune & Mumbai.
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
                Get Property Leads <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex items-center gap-6 text-sm text-brand-black/50 font-medium"
            >
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> 15-Day Free Trial</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Pay After Results</span>
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
                alt="Modern real estate property"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white rounded-2xl shadow-2xl p-5 border border-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-brand-black">200+</p>
                  <p className="text-xs text-brand-black/50 font-medium">Properties Sold</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-4 -right-4 md:-right-8 bg-brand-red text-white rounded-2xl shadow-2xl px-5 py-3"
            >
              <p className="text-sm font-bold">3x Avg. ROI</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-black text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">200+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">10k+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Buyer Leads Generated</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-2">3x</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Avg. ROI on Ad Spend</div>
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
          <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Platforms We Use to Drive Property Sales</p>
        </div>
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaGoogle size={32} /><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaMeta size={32} /><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaInstagram size={32} /><span className="text-xl font-display font-bold">Instagram</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaYoutube size={32} /><span className="text-xl font-display font-bold">YouTube Ads</span></div>
          </div>
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaGoogle size={32} /><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaMeta size={32} /><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaInstagram size={32} /><span className="text-xl font-display font-bold">Instagram</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><FaYoutube size={32} /><span className="text-xl font-display font-bold">YouTube Ads</span></div>
          </div>
        </div>
      </section>

      <TrustBadges type="real-estate" />
      <WorkspacePhotos type="real-estate" />
      <TeamShowcase type="real-estate" />

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-24 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Tailored Solutions for Real Estate</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              From residential apartments to commercial projects, we give you the digital edge to close deals faster and at a lower cost per acquisition.
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
                  {index % 3 === 1 && <Building2 size={120} />}
                  {index % 3 === 2 && <MapPin size={120} />}
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
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Why Real Estate Brands Choose Us</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Hyper-Local Targeting</h4>
                    <p className="text-brand-black/70">We target buyers by exact locality, income bracket, and buying intent — so every rupee of your ad budget reaches the right audience.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Site Visit Campaigns</h4>
                    <p className="text-brand-black/70">We don't just generate leads — we run dedicated campaigns optimized to bring serious buyers to your project site.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Project Launch Specialists</h4>
                    <p className="text-brand-black/70">We create pre-launch buzz, booking day campaigns, and post-launch remarketing to sell units fast.</p>
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
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000"
                  alt="Real estate property"
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
                <p className="text-lg font-bold mb-2">"We got 300+ site visits in our first project launch campaign."</p>
                <p className="text-sm opacity-80">- Developer, Pune</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-24 relative bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Property Sales Growth Process</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              A proven 4-step system that takes your project from zero visibility to booked units.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent -translate-y-1/2 z-0" />
            {[
              { icon: Target, title: 'Define Buyer Profile', desc: 'We map your ideal buyer — location, budget, family size — and build targeting around them.' },
              { icon: TrendingUp, title: 'Launch Lead Campaigns', desc: 'Multi-platform ads go live on Google, Meta & YouTube targeting serious property buyers.' },
              { icon: Users, title: 'Site Visit Nurturing', desc: 'Our WhatsApp automation and CRM follow up with every lead to schedule site visits.' },
              { icon: Home, title: 'Close & Scale', desc: 'We analyze what\'s working and scale your best-performing campaigns to fill inventory faster.' }
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
            <Building2 className="w-32 h-32 md:w-40 md:h-40 text-brand-red/20" />
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
            With full respect and gratitude. We look forward to helping you sell more properties.
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
