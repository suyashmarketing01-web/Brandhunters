import { motion } from 'motion/react';

const team = [
  {
    name: "Priya Sharma",
    role: "Graphic Design Head",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Suyash Shinde",
    role: "Digital Marketing Specialist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    isMiddle: true,
  },
  {
    name: "Rahul Verma",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-brand-white relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">Meet Our Team</h2>
          <p className="text-brand-black/70 max-w-2xl mx-auto text-base sm:text-lg">
            The experts behind the success. Our leadership team brings decades of combined experience in driving digital growth.
          </p>
        </div>

        {/* Mobile Horizontal Scroll / Desktop Flex */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar md:flex-row md:justify-center md:items-center md:gap-4 lg:gap-8 md:pt-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`min-w-[75vw] sm:min-w-[300px] md:min-w-0 snap-center mr-4 md:mr-0 relative group w-full max-w-sm shrink-0 ${member.isMiddle ? 'md:-translate-y-8 md:scale-110 z-10' : 'z-0'}`}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-xl border border-black/5 bg-white">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-brand-red font-medium text-xs sm:text-sm uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
