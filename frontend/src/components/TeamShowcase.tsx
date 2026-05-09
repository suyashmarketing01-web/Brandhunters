import { motion } from 'motion/react';
import { Users, Trophy, Briefcase, Award, TrendingUp, GraduationCap, Building2, Target, BarChart3, Heart } from 'lucide-react';

interface TeamShowcaseProps {
  type?: 'agency' | 'academy' | 'education' | 'real-estate' | 'hospital';
}

export default function TeamShowcase({ type = 'agency' }: TeamShowcaseProps) {
  const isAcademy = type === 'academy';
  const isEducation = type === 'education';
  const isRealEstate = type === 'real-estate';
  const isHospital = type === 'hospital';

  const content = isAcademy ? {
    tag: 'Our Student Community',
    title: 'Meet Our Students',
    desc: 'Join a vibrant community of 500+ learners who are building successful careers in digital marketing.',
    photo: '/images/academy/students-group.png',
    photoAlt: 'Brand Hunters Academy Students Group Photo - Batch 2025 Pune',
    badgeText: 'Latest Batch',
    badgeIcon: GraduationCap,
    photoTitle: 'Batch 2025 — Graduation Day',
    photoDesc: 'Another successful batch ready to conquer the digital world!',
    statPill: '500+ Alumni Strong',
    achievements: [
      { icon: Trophy, stat: '92%', label: 'Placement Rate', detail: 'Within 3 months of course completion' },
      { icon: Briefcase, stat: '4.2 LPA', label: 'Average Package', detail: 'For freshers with no prior experience' },
      { icon: Award, stat: '15+', label: 'Awards Won', detail: 'By our students in marketing competitions' },
    ]
  } : isEducation ? {
    tag: 'Our Specialist Team',
    title: 'The Team Behind Your Growth',
    desc: 'A dedicated squad of education marketing specialists who understand the unique challenges of filling classrooms and scaling admissions.',
    photo: '/images/education/team.png',
    photoAlt: 'Brand Hunters Education Marketing Team - Admission Growth Specialists',
    badgeText: 'Meet the Team',
    badgeIcon: Users,
    photoTitle: 'Education Marketing Experts',
    photoDesc: 'Specialists in admission funnels, campus branding, and student recruitment campaigns.',
    statPill: '50+ Institutions Served',
    achievements: [
      { icon: TrendingUp, stat: '300%', label: 'Avg. Admission Growth', detail: 'Across all partnered institutions' },
      { icon: Building2, stat: '50+', label: 'Schools & Colleges', detail: 'Trust us with their marketing' },
      { icon: Heart, stat: '4.9/5', label: 'Client Satisfaction', detail: '120+ verified Google reviews' },
    ]
  } : isRealEstate ? {
    tag: 'Our Property Marketing Team',
    title: 'The Team That Sells Properties',
    desc: 'A focused squad of real estate marketing specialists who know how to turn ad clicks into site visits and bookings.',
    photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200',
    photoAlt: 'Brand Hunters Real Estate Marketing Team Pune Mumbai',
    badgeText: 'Property Experts',
    badgeIcon: Building2,
    photoTitle: 'Real Estate Marketing Specialists',
    photoDesc: 'From project launch to final booking — we manage the full buyer journey.',
    statPill: '200+ Properties Sold',
    achievements: [
      { icon: TrendingUp, stat: '3x', label: 'Avg. ROI on Ad Spend', detail: 'Across residential & commercial projects' },
      { icon: Building2, stat: '200+', label: 'Properties Sold', detail: 'Apartments, villas, plots & commercial' },
      { icon: Heart, stat: '4.9/5', label: 'Builder Satisfaction', detail: '100+ verified Google reviews' },
    ]
  } : isHospital ? {
    tag: 'Our Healthcare Marketing Team',
    title: 'The Team Behind Patient Growth',
    desc: 'NABH-aware healthcare marketing specialists who understand the sensitivity and compliance needs of hospital advertising.',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1200',
    photoAlt: 'Brand Hunters Hospital Healthcare Marketing Team India',
    badgeText: 'Healthcare Experts',
    badgeIcon: Users,
    photoTitle: 'Hospital Marketing Specialists',
    photoDesc: 'Specialists in OPD campaigns, doctor branding, and patient appointment funnels.',
    statPill: '500+ Hospitals Served',
    achievements: [
      { icon: TrendingUp, stat: '70%', label: 'Avg. Patient Growth', detail: 'Within 60 days of campaign launch' },
      { icon: Target, stat: '500+', label: 'Hospitals Served', detail: 'Across India’s major cities' },
      { icon: Heart, stat: '4.9/5', label: 'Hospital Satisfaction', detail: '200+ verified Google reviews' },
    ]
  } : {
    tag: 'Our Team',
    title: 'Meet the Hunters',
    desc: 'A small, focused team of performance marketing experts who have managed over ₹20M in ad spend with consistently profitable returns.',
    photo: '/images/agency/team.png',
    photoAlt: 'Brand Hunters Digital Marketing Agency Team Photo - Pune',
    badgeText: 'Our Team',
    badgeIcon: Users,
    photoTitle: 'The Brand Hunters Squad',
    photoDesc: 'Every campaign is handled personally by our senior strategists — no junior team, no outsourcing.',
    statPill: '47+ Brands Managed',
    achievements: [
      { icon: Target, stat: '₹20M+', label: 'Ad Spend Managed', detail: 'Across Google, Meta & LinkedIn platforms' },
      { icon: TrendingUp, stat: '300%', label: 'Avg. ROI Delivered', detail: 'Consistent performance across verticals' },
      { icon: BarChart3, stat: '47+', label: 'Active Clients', detail: 'From startups to enterprise brands' },
    ]
  };

  return (
    <section className="py-12 sm:py-24 bg-white relative overflow-hidden">
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
            {content.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{content.title}</h2>
          <p className="text-brand-black/70 max-w-2xl mx-auto text-base sm:text-lg">
            {content.desc}
          </p>
        </motion.div>

        {/* Large Team Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 group"
        >
          <img 
            src={content.photo} 
            alt={content.photoAlt} 
            className="w-full h-[220px] sm:h-[450px] lg:h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold mb-3">
                  <content.badgeIcon className="w-3 h-3" /> {content.badgeText}
                </div>
                <h3 className="text-lg sm:text-3xl font-display font-bold text-white">{content.photoTitle}</h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1 hidden sm:block">{content.photoDesc}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-white text-xs sm:text-sm font-bold">
                  {content.statPill}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {content.achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-3 sm:p-8 rounded-xl sm:rounded-2xl bg-brand-gray border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group text-center"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-brand-red group-hover:text-white transition-colors" />
              </div>
              <div className="text-xl sm:text-3xl font-display font-bold text-brand-red mb-0.5 sm:mb-1">{item.stat}</div>
              <div className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1">{item.label}</div>
              <div className="text-[10px] sm:text-sm text-brand-black/60 hidden sm:block">{item.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
