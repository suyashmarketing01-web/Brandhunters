import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Building2, User, GraduationCap, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ContactForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAcademy = location.pathname === '/course';
  const isEducation = location.pathname === '/education';
  const isIntlPage = location.pathname === '/digital-marketing-uk-us';
  const isRealEstate = location.pathname === '/real-estate';
  const isHospital = location.pathname === '/hospital-marketing';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: isAcademy
        ? (form.elements.namedItem('graduation') as HTMLInputElement).value
        : (form.elements.namedItem('company') as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      source: isAcademy ? 'academy' : isEducation ? 'education' : isRealEstate ? 'real-estate' : isHospital ? 'hospital' : 'agency',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      navigate('/thank-you');
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    if (isAcademy) return "Ready to start your journey?";
    if (isEducation) return "Ready to Scale Your Admissions?";
    if (isRealEstate) return "Ready to Sell More Properties?";
    if (isHospital) return "Ready to Fill Your OPD?";
    return (
      <>Let's Hit Your <br className="hidden md:block" /><span className="text-brand-red">Next Target.</span></>
    );
  };

  const getDescription = () => {
    if (isAcademy) return "Fill out the form below and our team will get back to you within 24 hours to discuss your learning path.";
    if (isEducation) return "Schedule a free strategy session with our education marketing experts. We'll audit your current presence and provide a roadmap for growth.";
    if (isRealEstate) return "Book a free property marketing strategy session. We'll audit your current campaigns and show you exactly how to generate more buyer leads and site visits.";
    if (isHospital) return "Book a free hospital marketing audit worth ₹25,000. Our healthcare marketing specialists will show you how to get 500+ patient appointments in 60 days.";
    return "Ready to stop paying for plans and start paying for results? Book your free strategy call today and let's discuss how we can scale your ROI.";
  };

  return (
    <section id="contact" className="py-12 sm:py-24 bg-brand-gray relative overflow-hidden border-t border-black/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/5 skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter mb-6">
              {getTitle()}
            </h2>
            <p className="text-lg text-brand-black/70 mb-12 leading-relaxed">
              {getDescription()}
            </p>
            
            <div className="space-y-6 md:space-y-8">
              {/* Phone — hidden on UK/US page */}
              {!isIntlPage && (
                <div className="flex items-start md:items-center gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shrink-0 mt-1 md:mt-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-brand-black/50 font-bold uppercase tracking-widest">Call Us</p>
                    <p className="text-base md:text-lg font-bold">+91 7798484935</p>
                    <p className="text-[10px] md:text-xs text-brand-red font-bold mt-1">24/7 Support Available</p>
                  </div>
                </div>
              )}
              <div className="flex items-start md:items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shrink-0 mt-1 md:mt-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="break-all md:break-normal">
                  <p className="text-xs md:text-sm text-brand-black/50 font-bold uppercase tracking-widest">Email Us</p>
                  <p className="text-base md:text-lg font-bold">suyashmarketing365@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start md:items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shrink-0 mt-1 md:mt-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                {!isIntlPage ? (
                  <div>
                    <p className="text-xs md:text-sm text-brand-black/50 font-bold uppercase tracking-widest">Visit Us</p>
                    <p className="text-xs md:text-sm font-medium text-brand-black/80">
                      1) Blue berry Bulding B301, Hadapsar, Pune<br />
                      2) Behind new st stand plaus, Sangli
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs md:text-sm text-brand-black/50 font-bold uppercase tracking-widest">Based In</p>
                    <p className="text-xs md:text-sm font-medium text-brand-black/80">
                      🇮🇳 Pune, India &nbsp;&middot;&nbsp; Remote-First Agency<br />
                      Serving 🇬🇧 UK &amp; 🇺🇸 USA clients globally
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-black text-white p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="text-2xl font-display font-bold mb-8 relative z-10">
              {isAcademy ? "Apply Now" : isRealEstate ? "Get Free Property Marketing Plan" : isHospital ? "Book Free Hospital Audit" : "Get Your Free Proposal"}
            </h3>
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <User className="w-4 h-4" /> Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                    pattern="(\+91[\-\s]?)?[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor={isAcademy ? "graduation" : "company"} className="text-sm font-medium text-white/80 flex items-center gap-2">
                    {isAcademy ? <GraduationCap className="w-4 h-4" /> : <Building2 className="w-4 h-4" />} 
                    {isAcademy ? "Graduation In" : isRealEstate ? "Project / Builder Name" : isHospital ? "Hospital / Clinic Name" : "Company Name"}
                  </label>
                  <input
                    type="text"
                    id={isAcademy ? "graduation" : "company"}
                    name={isAcademy ? "graduation" : "company"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                    placeholder={isAcademy ? "B.Tech, B.Com, etc." : isRealEstate ? "e.g. Kolte Patil, XYZ Builders" : isHospital ? "e.g. City Hospital, ABC Clinic" : "Acme Corp"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-brand-red border border-transparent rounded-xl hover:bg-brand-red-hover hover:shadow-[0_0_30px_rgba(194,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red focus:ring-offset-brand-black mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader2 className="ml-2 w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Request
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
