import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Globe, TrendingUp, ShieldCheck, Zap, BarChart3, Users, Clock, DollarSign, Target, Rocket, Play } from 'lucide-react';
import { FaGoogle, FaMeta, FaLinkedin, FaTiktok } from 'react-icons/fa6';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const flags = { uk: '🇬🇧', us: '🇺🇸' };

const reviews = [
  { name: 'James Whitfield', role: 'CEO, TechFlow London', flag: '🇬🇧', text: 'We tried 3 agencies before Brand Hunters. The free first month sold us — results were undeniable. Now our Google Ads ROI is 6x.', rating: 5 },
  { name: 'Sarah Mitchell', role: 'Founder, GreenLeaf NYC', flag: '🇺🇸', text: 'Starting with no commitment was the best part. They scaled our Meta Ads from $500/mo to $8k once we saw the results.', rating: 5 },
  { name: 'David Harrington', role: 'MD, BuildPro Manchester', flag: '🇬🇧', text: 'Incredible team. They understood our B2B market fast. Lead quality is far superior to anything we had before.', rating: 5 },
];

const steps = [
  { icon: Play, num: '01', title: 'Free 30-Day Trial', desc: 'We run your ads at zero cost for one month. No contract, no credit card. Just results.' },
  { icon: BarChart3, num: '02', title: 'Review Results', desc: 'At day 30, you see real leads, real traffic, real data. Decide with full confidence.' },
  { icon: DollarSign, num: '03', title: 'Start Low Budget', desc: 'Begin with as little as £250/$250/mo. Scale only when you\'re satisfied.' },,
  { icon: Rocket, num: '04', title: 'Scale & Grow', desc: 'Our team optimises daily. Most clients 3x their budget within 90 days.' },
];

const services = [
  { icon: FaGoogle, title: 'Google Ads (PPC)', desc: 'Search, Display & Shopping campaigns targeting high-intent UK/US buyers.', tag: 'Most Popular' },
  { icon: FaMeta, title: 'Meta & Instagram Ads', desc: 'Precision-targeted social ads for B2C brands across the UK and US markets.', tag: '' },
  { icon: FaLinkedin, title: 'LinkedIn B2B Ads', desc: 'Decision-maker targeting for B2B companies in London, New York, and beyond.', tag: 'Best for B2B' },
  { icon: FaTiktok, title: 'TikTok & YouTube Ads', desc: 'Video-first campaigns for brands targeting younger demographics.', tag: '' },
];

const faqs = [
  { q: 'Is the free trial really free?', a: 'Yes — completely. We set up and run your campaigns for 30 days at no charge. You only pay your ad spend to Google/Meta directly. We take nothing.' },
  { q: 'What\'s the minimum budget after the trial?', a: 'As low as £250/$250 per month in management fees. Ad spend is separate and flexible — start with whatever you\'re comfortable with.' },
  { q: 'Do you work with small businesses?', a: 'Absolutely. Most of our UK/US clients start as small businesses. The free trial is designed specifically to remove the risk for smaller budgets.' },
  { q: 'How do you handle time zone differences?', a: 'Our team works across IST, GMT, and EST. You\'ll have a dedicated account manager reachable during your business hours.' },
  { q: 'What results can I expect in 30 days?', a: 'Most clients see qualified leads within the first 7–10 days. By day 30, we\'ll have full campaign data, audience insights, and a scaling plan.' },
];

export default function International() {
  return (
    <div className="w-full overflow-hidden bg-brand-white text-brand-black">
      <SEO
        title="Free 30-Day Digital Marketing Trial for UK & US Businesses | Brand Hunters"
        description="Get 1 month of free Google Ads & Meta Ads management. No contract, no commitment. UK & US businesses start risk-free, then scale on a low budget."
        keywords="digital marketing agency UK, digital marketing agency USA, google ads agency london, meta ads agency new york, free digital marketing trial"
        canonical="/digital-marketing-uk-us"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600"
            alt="London city skyline"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        {/* Animated grid */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(194,0,0,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(194,0,0,0.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-red text-sm font-bold">
                <Globe className="w-4 h-4" /> Serving {flags.uk} UK & {flags.us} USA Businesses
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-bold">
                🇮🇳 India-Based · Globally Trusted
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[1.05] mb-6">
              Your First Month<br />
              <span className="text-brand-red">Is On Us.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
              We run your Google Ads, Meta Ads & LinkedIn campaigns <strong className="text-white">completely free for 30 days</strong>. Then start with a budget as low as <strong className="text-brand-red">£250 / $250/mo</strong>. Zero risk. Total transparency.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-bold text-lg rounded-full hover:bg-brand-red-hover hover:shadow-[0_0_30px_rgba(194,0,0,0.5)] transition-all">
                Start My Free Month <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                See How It Works
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/50 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> No Contract</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> No Setup Fee</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Cancel Anytime</span>
            </motion.div>
          </div>

          {/* Right — offer card */}
          <motion.div initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full max-w-md">
            <div className="p-[1px] rounded-3xl bg-gradient-to-br from-brand-red via-red-400 to-brand-red/40">
              <div className="bg-[#0d0d0d] rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">Risk-Free Offer</p>
                    <p className="text-lg font-display font-bold text-white">30-Day Free Trial</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Full Google Ads setup & management',
                    'Meta/Instagram campaign creation',
                    'Weekly performance reports',
                    'Dedicated account manager',
                    'Audience research & strategy',
                    'Landing page recommendations',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/50 text-sm line-through">Normal Price: £1,500 / $1,500</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-black text-brand-red">FREE</span>
                    <span className="text-white/50 text-sm">for 30 days</span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">Then from £250/$250/mo — cancel anytime</p>
                </div>

                <a href="#contact"
                  className="block text-center w-full py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red-hover transition-colors shadow-[0_0_20px_rgba(194,0,0,0.3)]">
                  Claim Your Free Month →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="py-8 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { val: '47+', label: 'UK & US Clients' },
            { val: '4.9★', label: 'Google Rating' },
            { val: '£2M+', label: 'Ad Spend Managed' },
            { val: '6x', label: 'Avg. ROI' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-display font-bold text-brand-black">{s.val}</p>
              <p className="text-xs text-brand-black/50 uppercase tracking-wider font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INDIA-BASED SECTION ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0d0d0d] to-[#1a0a00] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=60&w=1200")', backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-[#0d0d0d]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-bold mb-6">
                🇮🇳 Why India-Based = Your Advantage
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                World-Class Talent.<br />
                <span className="text-orange-400">A Fraction of the Price.</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Our team is based in <strong className="text-white">Pune, India</strong> — the same talent hub that powers digital marketing for global Fortune 500 brands. You get Google & Meta certified experts, English-fluent account managers, and full UK/US timezone support — at <strong className="text-orange-400">60–80% lower cost</strong> than a London or New York agency.
              </p>
              <div className="space-y-4">
                {[
                  { emoji: '🎓', title: 'Google & Meta Certified', desc: 'Every manager holds active certifications — same as any top London agency.' },
                  { emoji: '🕐', title: 'GMT & EST Hours', desc: 'We work your hours. Morning standups, same-day responses, no excuses.' },
                  { emoji: '🌍', title: 'Global Client Experience', desc: 'UK property, US e-commerce, Australian SaaS — we know international markets.' },
                  { emoji: '💷', title: 'Transparent Pricing in £ & $', desc: 'All quotes, reports, and invoices in your currency. No confusion.' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-2xl shrink-0">{item.emoji}</span>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: big cost callout card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-orange-500/60 via-orange-400/40 to-orange-500/20">
              <div className="bg-[#120800] rounded-3xl p-8 sm:p-10 text-center">
                <p className="text-orange-400/70 text-sm font-bold uppercase tracking-widest mb-4">Compare the cost</p>
                <div className="space-y-6 text-left mb-8">
                  {[
                    { label: '🇬🇧 London Agency', price: '£2,000–£5,000/mo', faded: true },
                    { label: '🇺🇸 New York Agency', price: '$3,000–$7,000/mo', faded: true },
                    { label: '🇮🇳 Brand Hunters', price: 'From £250/$250/mo', faded: false },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between items-center py-3 border-b border-white/10 ${!row.faded ? 'border-orange-500/30' : ''}`}>
                      <span className={`text-sm font-medium ${row.faded ? 'text-white/40' : 'text-white font-bold'}`}>{row.label}</span>
                      <span className={`text-sm font-bold ${row.faded ? 'text-white/30 line-through' : 'text-orange-400 text-lg'}`}>{row.price}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6">
                  <p className="text-4xl font-display font-black text-orange-400 mb-1">80% Savings</p>
                  <p className="text-white/50 text-sm">vs. average UK/US agency fees</p>
                </div>
                <a href="#contact"
                  className="block text-center w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  Get My Free Month — No Risk
                </a>
                <p className="text-white/30 text-xs mt-3">🇮🇳 Based in Pune · Serving 🇬🇧 UK & 🇺🇸 USA</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
              <Zap className="w-4 h-4" /> Simple 4-Step Process
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">From Free Trial to Full Growth</h2>
            <p className="text-brand-black/60 max-w-xl mx-auto text-lg">No guesswork. No risk. Just a clear path to measurable results.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative z-10 p-6 rounded-2xl bg-white border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all group text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-red text-white text-sm font-bold flex items-center justify-center">
                  {step.num}
                </div>
                <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4 mt-4 group-hover:bg-brand-red transition-colors">
                  <step.icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{step.title}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
              <Target className="w-4 h-4" /> What's Included Free
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Every Service, No Charge for 30 Days</h2>
            <p className="text-brand-black/60 max-w-xl mx-auto">Full-service digital marketing — not a watered-down trial.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl border-2 border-brand-red/10 hover:border-brand-red hover:shadow-2xl transition-all relative overflow-hidden">
                {svc.tag && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-full">{svc.tag}</div>
                )}
                <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors">
                  <svc.icon size={28} className="text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{svc.title}</h3>
                <p className="text-brand-black/60 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <a href="#contact" className="text-brand-red text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Include This Free <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BRAND HUNTERS ── */}
      <section className="py-20 sm:py-28 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/20 text-brand-red text-sm font-bold mb-6">
                <Globe className="w-4 h-4" /> {flags.uk} UK & {flags.us} US Market Expertise
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Why Businesses Choose Us Over Local Agencies</h2>
              <div className="space-y-5">
                {[
                  { icon: DollarSign, title: '60% Lower Cost Than UK/US Agencies', desc: 'Same quality, world-class results — at a fraction of local agency prices.' },
                  { icon: Clock, title: 'Your Time Zone, Our Problem', desc: 'Dedicated managers available during GMT & EST business hours.' },
                  { icon: TrendingUp, title: 'Performance-First Culture', desc: 'We optimise daily, not monthly. Your campaigns never sleep.' },
                  { icon: Users, title: 'Industry-Specific Experience', desc: 'We know UK property, US e-commerce, B2B SaaS, healthcare and more.' },
                ].map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{f.title}</h4>
                      <p className="text-white/50 text-sm">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing comparison */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-display font-bold mb-6 text-center">Price Comparison</h3>
              <div className="space-y-5">
                {[
                  { label: 'Average UK Agency', price: '£2,500/mo', pct: '100%', highlight: false },
                  { label: 'Average US Agency', price: '$3,000/mo', pct: '100%', highlight: false },
                  { label: 'Brand Hunters', price: 'From £250/mo', pct: '25%', highlight: true },
                ].map((r, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={r.highlight ? 'text-white font-bold' : 'text-white/50'}>{r.label}</span>
                      <span className={r.highlight ? 'text-brand-red font-bold' : 'text-white/30'}>{r.price}</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: r.pct }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
                        className={`h-full rounded-full ${r.highlight ? 'bg-gradient-to-r from-brand-red to-red-400' : 'bg-white/20'}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-center">
                <p className="text-brand-red font-bold text-lg">Save up to 80% vs. local agencies</p>
                <p className="text-white/50 text-xs mt-1">Without sacrificing quality or results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="py-20 sm:py-28 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 text-brand-red text-sm font-bold mb-4">
              <Star className="w-4 h-4 fill-brand-red" /> Verified Reviews
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">What UK & US Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-2xl">{r.flag}</div>
                  <div>
                    <p className="font-bold">{r.name}</p>
                    <p className="text-xs text-brand-black/50">{r.role}</p>
                  </div>
                </div>
                <div className="flex text-[#FBBC05] mb-4">
                  {Array(r.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-brand-black/70 text-sm leading-relaxed">"{r.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-brand-black/60">Everything UK & US businesses ask before starting.</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-brand-gray border border-black/5 hover:shadow-md transition-shadow">
                <h4 className="font-bold mb-2 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red text-xs flex items-center justify-center shrink-0 mt-0.5">Q</span>
                  {f.q}
                </h4>
                <p className="text-brand-black/60 text-sm pl-9">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-brand-red text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/70 font-medium mb-3 uppercase tracking-widest text-sm">{flags.uk} {flags.us} Limited Slots Available</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to Start Growing?</h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Join 47+ UK & US businesses growing with Brand Hunters. Your first month is completely free — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-brand-red font-bold text-xl rounded-full hover:bg-brand-gray transition-all shadow-2xl">
                Start My Free Month <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p className="text-white/50 text-sm mt-6">No contract · No credit card · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <ContactForm />
    </div>
  );
}
