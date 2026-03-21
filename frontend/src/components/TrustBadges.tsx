import { motion } from 'motion/react';
import { Shield, Award, Users, Heart, Star, Target } from 'lucide-react';

interface TrustBadgeProps {
  type?: 'agency' | 'academy' | 'education';
}

export default function TrustBadges({ type = 'agency' }: TrustBadgeProps) {
  const isAcademy = type === 'academy';
  const isEducation = type === 'education';

  const getBadges = () => {
    if (isAcademy) {
      return [
        { icon: Shield, title: 'ISO Certified', desc: 'Internationally recognized quality standards', color: 'bg-blue-50 text-blue-600' },
        { icon: Award, title: 'Google Partner', desc: 'Certified Google Ads training academy', color: 'bg-red-50 text-red-600' },
        { icon: Users, title: '500+ Alumni', desc: 'Successfully placed across India', color: 'bg-green-50 text-green-600' },
        { icon: Heart, title: '4.9★ on Google', desc: '120+ verified 5-star reviews', color: 'bg-amber-50 text-amber-600' },
      ];
    } else if (isEducation) {
      return [
        { icon: Target, title: 'Admissions Driven', desc: '100% focused on filling your seats', color: 'bg-blue-50 text-blue-600' },
        { icon: Award, title: '50+ Institutions', desc: 'Trusted by schools and universities', color: 'bg-red-50 text-red-600' },
        { icon: Users, title: '15k+ Leads Gen', desc: 'High-quality prospective students', color: 'bg-green-50 text-green-600' },
        { icon: Shield, title: 'Setup Fees: ₹0', desc: 'Pay after performance model', color: 'bg-amber-50 text-amber-600' },
      ];
    } else {
      return [
        { icon: Shield, title: 'Performance First', desc: '100% focused on guaranteed ROI', color: 'bg-blue-50 text-blue-600' },
        { icon: Award, title: 'Google Partner', desc: 'Certified Google Ads and Meta experts', color: 'bg-red-50 text-red-600' },
        { icon: Users, title: '47+ Brands', desc: 'Trusted by high-growth businesses', color: 'bg-green-50 text-green-600' },
        { icon: Heart, title: '₹20M+ Managed', desc: 'Consistently scaling ad spend profitably', color: 'bg-amber-50 text-amber-600' },
      ];
    }
  };

  const badges = getBadges();

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
            <Star className="w-4 h-4" />
            {isAcademy ? 'Why Students Trust Us' : isEducation ? 'Why Institutions Trust Us' : 'Why Brands Trust Us'}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            {isAcademy ? "Pune's Most Trusted Digital Academy" : isEducation ? "Pune's #1 Education Marketing Agency" : "Pune's #1 Trusted Marketing Agency"}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-lg transition-all text-center group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${badge.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <badge.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-1">{badge.title}</h3>
              <p className="text-xs sm:text-sm text-brand-black/60">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
