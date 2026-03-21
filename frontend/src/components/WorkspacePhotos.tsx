import { motion } from 'motion/react';
import { Camera, Cpu, BookOpen, Presentation, Users, Target, BarChart3 } from 'lucide-react';

interface WorkspacePhotosProps {
  type?: 'agency' | 'academy' | 'education';
}

export default function WorkspacePhotos({ type = 'agency' }: WorkspacePhotosProps) {
  const isAcademy = type === 'academy';
  const isEducation = type === 'education';

  const headingProps = isAcademy ? {
    tag: 'Campus Tour',
    title: 'Our State-of-the-Art Campus',
    desc: 'A modern learning environment designed to give you real-world digital marketing experience from day one.',
    icon: Camera
  } : isEducation ? {
    tag: 'Education Success',
    title: 'Proven Admission Results',
    desc: 'We use data-driven strategies and beautiful campus branding to attract top-tier students year-round.',
    icon: Target
  } : {
    tag: 'Our Workspace',
    title: 'Where Results Are Engineered',
    desc: 'Our data-driven command center where we manage millions in ad spend and brainstorm winning strategies.',
    icon: Users
  };

  const photo1 = isAcademy ? {
    src: '/images/academy/classroom.png',
    alt: 'Modern Digital Marketing Classroom at Brand Hunters Academy Pune',
    badgeText: 'Smart Classroom',
    badgeIcon: Cpu,
    title: 'Fully Equipped Computer Labs',
    desc: 'High-speed systems with dual monitors, live ad platforms, and analytics dashboards.'
  } : isEducation ? {
    src: '/images/education/campus.png',
    alt: 'Diverse happy university students campus walking Brand Hunters client',
    badgeText: 'Attract Students',
    badgeIcon: Users,
    title: 'Top-Tier Student Recruitment',
    desc: 'Engaging, modern campus marketing that appeals to your target demographic.'
  } : {
    src: '/images/agency/dashboard.png',
    alt: 'Brand Hunters Digital Marketing ROI dashboard and workstation',
    badgeText: 'Command Center',
    badgeIcon: Cpu,
    title: 'Performance Marketing Hub',
    desc: 'Monitors displaying live analytics, CPA tracking, and real-time ROAS optimization.'
  };

  const photo2 = isAcademy ? {
    src: '/images/academy/training-session.png',
    alt: 'Live Digital Marketing Training Session at Brand Hunters Academy',
    badgeText: 'Live Training',
    badgeIcon: BookOpen,
    title: 'Hands-On Live Campaign Sessions',
    desc: 'Learn by running real Google & Meta Ads campaigns with actual budgets.'
  } : isEducation ? {
    src: '/images/education/strategy.png',
    alt: 'Brand Hunters marketing consultant presenting admission growth data to board',
    badgeText: 'Proven Growth',
    badgeIcon: BarChart3,
    title: 'Data-Driven Admission Strategy',
    desc: 'Transparent reporting showing exact spikes in qualified leads and enrollments.'
  } : {
    src: '/images/agency/strategy.png',
    alt: 'Brand Hunters Strategy Brainstorming Session funnel whiteboard',
    badgeText: 'Strategic Brainstorming',
    badgeIcon: Presentation,
    title: 'Live Strategy Sessions',
    desc: 'Collaborative war-room discussions to plan high-converting funnels and creative direction.'
  };

  return (
    <section className="py-12 sm:py-24 bg-brand-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
            <headingProps.icon className="w-4 h-4" />
            {headingProps.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{headingProps.title}</h2>
          <p className="text-brand-black/70 max-w-2xl mx-auto text-base sm:text-lg">
            {headingProps.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Photo 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img 
              src={photo1.src} 
              alt={photo1.alt} 
              className="w-full h-[200px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold mb-3">
                <photo1.badgeIcon className="w-3 h-3" /> {photo1.badgeText}
              </div>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white mb-1 sm:mb-2">{photo1.title}</h3>
              <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{photo1.desc}</p>
            </div>
          </motion.div>

          {/* Photo 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img 
              src={photo2.src} 
              alt={photo2.alt} 
              className="w-full h-[200px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-bold mb-3">
                <photo2.badgeIcon className="w-3 h-3" /> {photo2.badgeText}
              </div>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white mb-1 sm:mb-2">{photo2.title}</h3>
              <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{photo2.desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
