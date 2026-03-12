import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Briefcase, Cpu, CheckCircle2, BookOpen, Star, Trophy, Sparkles } from 'lucide-react';
import { FaGoogle, FaMeta, FaCode, FaRobot, FaChartLine } from 'react-icons/fa6';
import AnimatedBackground from '../components/AnimatedBackground';
import ContactForm from '../components/ContactForm';
import { useState, useEffect } from 'react';

export default function Course() {
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setPartners(Math.floor((120 / steps) * currentStep));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setPartners(120);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-40 overflow-hidden bg-brand-black text-white">
        <AnimatedBackground color="#C20000" type="grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black pointer-events-none" />
        
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
              <span>ResultsFirst Academy • We believe in results, not plans.</span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-8 text-center divide-x divide-white/10 md:divide-x-0">
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Internship Guarantee</div>
            </div>
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">{partners}+</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Hiring Partners</div>
            </div>
            <div className="px-2 sm:px-0 md:border-l md:border-white/10">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Placement Assistance</div>
            </div>
            <div className="px-2 sm:px-0">
              <div className="text-3xl sm:text-4xl font-display font-bold text-brand-red mb-1 sm:mb-2">4.9/5</div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section id="details" className="py-16 sm:py-24 relative bg-brand-gray overflow-hidden">
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
                className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center mr-4 md:mr-0 p-8 rounded-2xl bg-white border border-black/5 hover:border-brand-red hover:shadow-xl transition-all group shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-brand-gray flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
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
      <section id="curriculum" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="p-6 sm:p-10 rounded-3xl bg-brand-gray border border-black/5 relative overflow-hidden group hover:shadow-2xl transition-all"
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

      {/* Google Reviews Section */}
      <section id="reviews" className="py-16 sm:py-24 bg-brand-white relative overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">Student Success Stories</h2>
              <p className="text-brand-black/70 text-base sm:text-lg">
                Hear from our alumni in Pune who transformed their careers through our practical, hands-on digital marketing programs.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-black/5 shrink-0 w-full sm:w-auto">
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

          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
            {[
              { name: "Rohan Deshmukh", location: "Kothrud, Pune", time: "1 month ago", text: "The 3-month class followed by the 6-month internship was exactly what I needed. The real live campaign handling experience gave me the confidence to crack my first agency interview!", initial: "R", color: "bg-blue-500" },
              { name: "Priya Kulkarni", location: "Viman Nagar, Pune", time: "3 weeks ago", text: "Best digital marketing institute in Pune! They don't just teach theory; they give you actual ad budgets to run campaigns. The 100% placement guarantee is genuine.", initial: "P", color: "bg-emerald-500" },
              { name: "Aditya Patil", location: "Baner, Pune", time: "2 months ago", text: "I joined the advanced program and the hands-on approach is unmatched. Getting to work on live projects during the internship helped me secure a full-time role immediately.", initial: "A", color: "bg-purple-500" }
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }} 
                className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center mr-4 md:mr-0 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-black/5 relative hover:-translate-y-1 transition-transform duration-300 shrink-0"
              >
                <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-[#4285F4] w-5 h-5 sm:w-6 sm:h-6">
                  <FaGoogle size="100%" />
                </div>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${review.color} text-white flex items-center justify-center text-lg sm:text-xl font-bold`}>
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-bold text-brand-black text-sm sm:text-base">{review.name}</div>
                    <div className="text-xs text-brand-black/50">{review.location} • {review.time}</div>
                  </div>
                </div>
                <div className="flex text-[#FBBC05] mb-3 sm:mb-4">
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

      {/* Why Placement Matters / FAQ */}
      <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">Why Job Placement Matters</h2>
            <p className="text-brand-black/70 text-base sm:text-lg">
              Many students struggle to find jobs without placement support despite having theoretical knowledge. Our program bridges the gap between learning and earning.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              { q: "Do you guarantee a job?", a: "We guarantee 100% placement assistance and interview opportunities with our hiring partners. Your performance in interviews determines the final offer." },
              { q: "What kind of companies hire your students?", a: "Our alumni work at top digital agencies, fast-growing startups, and established enterprise brands looking for data-driven marketers." },
              { q: "Do I need prior marketing experience?", a: "No. Our 3-month program is designed from scratch. However, basic computer literacy and a passion for digital trends are required." }
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

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 md:hidden">
        <a 
          href="#contact" 
          className="w-full flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-brand-red rounded-xl hover:bg-brand-red-hover active:scale-[0.98] transition-all shadow-lg"
        >
          Apply Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
