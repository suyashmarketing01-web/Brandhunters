import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Briefcase, Cpu, CheckCircle2, BookOpen, Star, Trophy, Sparkles, Users, Award, Shield, MapPin, Clock, Calendar, Camera, Heart } from 'lucide-react';
import { FaGoogle, FaMeta, FaCode, FaRobot, FaChartLine, FaTiktok, FaLinkedin } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import TrustBadges from '../components/TrustBadges';
import WorkspacePhotos from '../components/WorkspacePhotos';
import { useState, useEffect } from 'react';

export default function Course() {
  const [partners, setPartners] = useState(0);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setPartners(Math.floor((120 / steps) * currentStep));
      setStudents(Math.floor((500 / steps) * currentStep));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setPartners(120);
        setStudents(500);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-40 overflow-hidden bg-brand-black text-white">
        {/* Theme Blurred Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/academy/classroom.png" 
            alt="Academy Background" 
            className="w-full h-full object-cover blur-sm opacity-40 scale-110"
          />
        </div>
        
        <AnimatedBackground color="#E60000" type="grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 pointer-events-none z-[1]" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] text-white/10"
          >
            <FaGoogle size={64} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-[15%] text-white/10"
          >
            <FaMeta size={72} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 left-[15%] text-white/10"
          >
            <FaChartLine size={56} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-1/4 right-[20%] text-white/10"
          >
            <FaCode size={60} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-1/2 left-[5%] text-white/10 hidden md:block"
          >
            <FaRobot size={50} />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mb-8 backdrop-blur-sm"
            >
              <GraduationCap className="w-4 h-4 text-brand-red" />
              <span>Brand Hunters Academy • We believe in results, not plans.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-6 sm:mb-8"
            >
              Master Digital Marketing & AI.<br />
              <span className="text-brand-red">
                Placement Guaranteed.
              </span>
            </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-10 sm:mb-12 px-4 sm:px-0"
          >
            The digital marketing industry is booming, but theory isn't enough. Learn hands-on skills, master AI tools, and secure your career with our dedicated placement support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <a href="#contact" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-brand-red border border-transparent rounded-full hover:bg-brand-red-hover hover:shadow-[0_0_30px_rgba(194,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-black">
              Join Our Next Batch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 focus:ring-offset-black">
              Download Syllabus
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-12 p-[1px] rounded-2xl bg-gradient-to-r from-brand-red/50 via-brand-red to-brand-red/50 max-w-3xl w-full"
          >
            <div className="bg-brand-black rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-xs font-bold mb-3 uppercase tracking-wider">
                  Special Payment Plan
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Pay 50% After Placement</h3>
                <p className="text-white/80">Start your classes today with an initial payment of just <strong className="text-brand-red text-xl">₹15,000</strong>.</p>
              </div>
              <div className="shrink-0 w-full sm:w-auto">
                 <a href="#contact" className="inline-block text-center w-full sm:w-auto px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red-hover transition-colors shadow-[0_0_20px_rgba(194,0,0,0.3)]">
                   Claim Offer
                 </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-12 border-y border-white/10 bg-brand-black text-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6 sm:gap-8 text-center">
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">{students}+</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Students Trained</div>
            </div>
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Internship Guarantee</div>
            </div>
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">{partners}+</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Hiring Partners</div>
            </div>
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Placement Assistance</div>
            </div>
            <div className="px-2 sm:px-0 col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">4.9/5</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges type="academy" />

      {/* Our Campus & Infrastructure */}
      <WorkspacePhotos type="academy" />
      
      {/* Campus Features Grid */}
      <section className="py-12 bg-white relative overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Cpu, label: '30+ Workstations', detail: 'High-speed computers' },
              { icon: MapPin, label: 'Pune Location', detail: 'Easy accessibility' },
              { icon: Clock, label: 'Flexible Timings', detail: 'Morning & evening batches' },
              { icon: Calendar, label: 'Weekend Batches', detail: 'For working professionals' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-4 sm:p-5 rounded-xl bg-white border border-black/5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <item.icon className="w-6 h-6 text-brand-red mb-2" />
                <div className="text-sm font-bold">{item.label}</div>
                <div className="text-xs text-brand-black/50">{item.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Students - Photo Gallery */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
              <Users className="w-4 h-4" />
              Our Student Community
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Meet Our Students</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-base sm:text-lg">
              Join a vibrant community of 500+ learners who are building successful careers in digital marketing.
            </p>
          </motion.div>

          {/* Large Group Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden mb-8 group"
          >
            <img 
              src="/images/academy/students-group.png" 
              alt="Brand Hunters Academy Students Group Photo - Batch 2025 Pune" 
              className="w-full h-[300px] sm:h-[450px] lg:h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold mb-3">
                    <GraduationCap className="w-3 h-3" /> Latest Batch
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Batch 2025 — Graduation Day</h3>
                  <p className="text-white/80 text-sm mt-1">Another successful batch ready to conquer the digital world!</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-bold">
                    500+ Alumni Strong
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Student Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Trophy, stat: '92%', label: 'Placement Rate', detail: 'Within 3 months of course completion' },
              { icon: Briefcase, stat: '4.2 LPA', label: 'Average Package', detail: 'For freshers with no prior experience' },
              { icon: Award, stat: '15+', label: 'Awards Won', detail: 'By our students in marketing competitions' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 sm:p-8 rounded-2xl bg-brand-gray border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group text-center"
              >
                <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl font-display font-bold text-brand-red mb-1">{item.stat}</div>
                <div className="text-base font-bold mb-1">{item.label}</div>
                <div className="text-sm text-brand-black/60">{item.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-brand-white text-brand-black overflow-hidden border-y border-brand-red/20">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-sm font-medium text-brand-black/50 uppercase tracking-widest">Platforms You Will Master</p>
        </div>
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaGoogle size={32} /></span><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaMeta size={32} /></span><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaTiktok size={32} /></span><span className="text-xl font-display font-bold">TikTok Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaLinkedin size={32} /></span><span className="text-xl font-display font-bold">LinkedIn Ads</span></div>
          </div>
          <div className="flex w-1/2 justify-around items-center">
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaGoogle size={32} /></span><span className="text-xl font-display font-bold">Google Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaMeta size={32} /></span><span className="text-xl font-display font-bold">Meta Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaTiktok size={32} /></span><span className="text-xl font-display font-bold">TikTok Ads</span></div>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"><span className="flex items-center justify-center w-8 h-8"><FaLinkedin size={32} /></span><span className="text-xl font-display font-bold">LinkedIn Ads</span></div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section id="details" className="py-16 sm:py-24 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">More Than Just Theory</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-base sm:text-lg">
              Our programs are designed to make you a valuable asset to any company from day one. We combine live projects, personality development, and interview preparation.
            </p>
          </div>

          {/* Mobile Horizontal Scroll / Desktop Grid */}
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
            {[
              { icon: BookOpen, title: 'Live Projects', desc: 'Work on real campaigns with actual budgets. No dummy data.' },
              { icon: Cpu, title: 'AI-Driven Skills', desc: 'Master generative AI for content, predictive analytics, and marketing automation.' },
              { icon: Briefcase, title: 'Interview Prep', desc: 'Mock interviews, resume building, and personality development sessions.' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center mr-4 md:mr-0 p-8 rounded-2xl bg-brand-gray border border-black/5 hover:border-brand-red hover:shadow-xl transition-all group shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{feature.title}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Durations */}
      <section id="curriculum" className="py-16 sm:py-24 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Choose Your Path</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto">Flexible programs designed for every stage of your career</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="p-6 sm:p-10 rounded-3xl bg-white border border-black/5 relative overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 blur-3xl rounded-full" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold mb-6 text-brand-black">
                Intensive
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">3-Month Program</h3>
              <p className="text-brand-black/70 mb-6 text-sm sm:text-base">Fast-track your career with our intensive bootcamp. Ideal for beginners and fresh graduates. Includes <strong>real live campaign handling experience</strong>.</p>
              
              <div className="mb-6 sm:mb-8 p-4 rounded-xl bg-brand-red/5 border border-brand-red/10">
                <p className="text-brand-red font-bold mb-1">Pay 50% After Placement</p>
                <p className="text-brand-black/70 text-xs sm:text-sm">Start classes with just ₹15,000 upfront.</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8">
                {['Core SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Basic AI Tools', '1 Live Project'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-brand-black/80 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center w-full py-4 rounded-xl bg-white hover:bg-brand-red hover:text-white border border-black/10 transition-colors font-bold shadow-sm">
                View Curriculum
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="p-6 sm:p-10 rounded-3xl bg-brand-black text-white border border-brand-red/30 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(194,0,0,0.3)] transition-all"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 blur-3xl rounded-full" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-xs font-bold mb-6">
                Mastery + 100% Internship Guarantee
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">3-Month Class + 6-Month Internship</h3>
              <p className="text-white/70 mb-6 text-sm sm:text-base">Comprehensive mastery with a <strong>100% Internship Guarantee</strong>. Perfect for career switchers. Get <strong>real live campaign handling experience</strong> from day one.</p>
              
              <div className="mb-6 sm:mb-8 p-4 rounded-xl bg-brand-red/10 border border-brand-red/20">
                <p className="text-brand-red font-bold mb-1">Pay 50% After Placement</p>
                <p className="text-white/80 text-xs sm:text-sm">Start classes with just ₹15,000 upfront.</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8">
                {['Advanced Performance Marketing', 'Marketing Automation & CRM', 'Generative AI & Prompt Engineering', 'Data Analytics & CRO', '3 Live Projects + 6-Month Internship'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center w-full py-4 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white transition-colors font-bold shadow-lg">
                Apply Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Success Stories with Photos */}
      <section id="reviews" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
                <Star className="w-4 h-4" />
                Verified Success Stories
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">Students Who Made It Big</h2>
              <p className="text-brand-black/70 text-base sm:text-lg">
                Real stories from our alumni in Pune who transformed their careers through our practical, hands-on digital marketing programs.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 bg-brand-gray p-4 sm:p-6 rounded-2xl shadow-xl border border-black/5 shrink-0 w-full sm:w-auto">
              <div className="text-4xl sm:text-6xl font-display font-black text-brand-black">4.8</div>
              <div>
                <div className="flex text-[#FBBC05] mb-1 sm:mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-xs sm:text-sm font-medium text-brand-black/60">Based on 120+ Google Reviews</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-black/10 mx-2" />
              <div className="hidden sm:flex items-center justify-center text-[#4285F4]">
                <FaGoogle size={48} />
              </div>
            </div>
          </div>

          {/* Student Testimonial Cards with Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                name: "Rohan Deshmukh", 
                role: "Digital Marketing Executive",
                company: "Leading Pune Agency", 
                location: "Kothrud, Pune", 
                time: "1 month ago", 
                text: "The 3-month class followed by the 6-month internship was exactly what I needed. The real live campaign handling experience gave me the confidence to crack my first agency interview! Now earning 4.5 LPA within 6 months of completing the course.", 
                image: "/images/academy/student-1.png",
                color: "bg-blue-500",
                salary: "4.5 LPA"
              },
              { 
                name: "Priya Kulkarni", 
                role: "Social Media Manager",
                company: "Tech Startup", 
                location: "Viman Nagar, Pune", 
                time: "3 weeks ago", 
                text: "Best digital marketing institute in Pune! They don't just teach theory; they give you actual ad budgets to run campaigns. The 100% placement guarantee is genuine. I got placed even before my course ended!", 
                image: "/images/academy/student-2.png",
                color: "bg-emerald-500",
                salary: "5.2 LPA"
              },
              { 
                name: "Aditya Patil", 
                role: "Performance Marketer",
                company: "E-commerce Brand", 
                location: "Baner, Pune", 
                time: "2 months ago", 
                text: "I joined the advanced program and the hands-on approach is unmatched. Getting to work on live projects during the internship helped me secure a full-time role immediately. The AI tools training was a game-changer!", 
                image: "/images/academy/student-3.png",
                color: "bg-purple-500",
                salary: "5.8 LPA"
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.15, duration: 0.6 }} 
                className="bg-brand-gray p-0 rounded-2xl shadow-lg border border-black/5 relative hover:-translate-y-2 transition-transform duration-300 overflow-hidden group"
              >
                {/* Student Photo */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={review.image} 
                    alt={`${review.name} - Brand Hunters Academy Alumni`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 text-[#4285F4]">
                    <FaGoogle size={20} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold text-white text-base">{review.name}</div>
                        <div className="text-xs text-white/80">{review.role} at {review.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Review Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#FBBC05]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      {review.salary}
                    </div>
                  </div>
                  <p className="text-brand-black/70 text-sm leading-relaxed mb-3">"{review.text}"</p>
                  <div className="text-xs text-brand-black/40 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {review.location} • {review.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-24 relative bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Your Path to a Guaranteed Placement</h2>
            <p className="text-brand-black/70 max-w-2xl mx-auto text-lg">
              A structured roadmap from day one to the day you secure your full-time job offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent -translate-y-1/2 z-0" />

            {[
              { icon: BookOpen, title: 'Learn the Basics', desc: 'Master the fundamentals of digital marketing, analytics, and strategy.' },
              { icon: Cpu, title: 'Hands-on AI Tools', desc: 'Automate content and scale your campaigns using AI in live labs.' },
              { icon: Sparkles, title: 'Live Ad Budgets', desc: 'Manage real money and run actual ad campaigns during the course.' },
              { icon: Trophy, title: 'Get Hired', desc: 'Pass the final project to receive your guaranteed placement / internship offer.' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
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

      {/* Hiring Partners / Companies Trust Us */}
      <section className="py-16 sm:py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Students Work At</h2>
            <p className="text-brand-black/70 max-w-xl mx-auto">Top companies across India trust Brand Hunters Academy graduates</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {[
              'Digital Agencies', 'Tech Startups', 'E-Commerce Brands', 'IT Companies', 'FMCG Companies', 'Media Houses'
            ].map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 sm:p-6 rounded-xl bg-brand-gray border border-black/5 flex items-center justify-center text-center hover:shadow-md hover:border-brand-red/20 transition-all"
              >
                <span className="text-xs sm:text-sm font-bold text-brand-black/70">{company}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 p-6 sm:p-8 rounded-2xl bg-brand-black text-white text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div>
                <div className="text-3xl font-display font-bold text-brand-red">120+</div>
                <div className="text-sm text-white/60">Hiring Partners</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-display font-bold text-brand-red">92%</div>
                <div className="text-sm text-white/60">Placement Rate</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-display font-bold text-brand-red">3 Months</div>
                <div className="text-sm text-white/60">Avg Placement Time</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-display font-bold text-brand-red">4.2 LPA</div>
                <div className="text-sm text-white/60">Avg Starting Package</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Placement Matters / FAQ */}
      <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
            <p className="text-brand-black/70 text-base sm:text-lg">
              Everything you need to know about our programs, placements, and payments.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              { q: "Do you guarantee a job?", a: "We guarantee 100% placement assistance and interview opportunities with our hiring partners. Your performance in interviews determines the final offer. 92% of our students get placed within 3 months." },
              { q: "What kind of companies hire your students?", a: "Our alumni work at top digital agencies, fast-growing startups, and established enterprise brands looking for data-driven marketers. We have 120+ hiring partners across Pune, Mumbai, and Bangalore." },
              { q: "Do I need prior marketing experience?", a: "No. Our 3-month program is designed from scratch. However, basic computer literacy and a passion for digital trends are required." },
              { q: "What is the Pay 50% After Placement plan?", a: "You only need to pay ₹15,000 upfront to start classes. The remaining 50% of the fee is paid after you get placed in a job. This shows our confidence in our training quality." },
              { q: "Are the classes offline or online?", a: "We offer offline classes at our Pune campus with fully equipped computer labs. Weekend batches are also available for working professionals." },
              { q: "What tools will I learn?", a: "You'll master Google Ads, Meta Ads, SEO tools (Ahrefs, SEMrush), Google Analytics, marketing automation platforms, CRM tools, and generative AI tools like ChatGPT and MidJourney for marketing." },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center text-xs text-brand-red shrink-0">Q</div>
                  {faq.q}
                </h4>
                <p className="text-brand-black/60 text-sm pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 sm:mt-20 text-center">
            <a href="#contact" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-brand-red border border-transparent rounded-full hover:bg-brand-red-hover hover:shadow-[0_0_30px_rgba(194,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-white">
              Book a Free Career Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Namaste / Thank You Section */}
      <section className="py-32 bg-brand-white relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-black/5 pb-40 md:pb-32">
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
            With full respect and gratitude. We look forward to launching your digital marketing career.
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
