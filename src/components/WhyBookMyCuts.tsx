import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const WHY_IMAGE = 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=900&auto=format&fit=crop&q=80';

const points = [
  { label: 'Easy Booking', desc: 'Book your appointment in under 2 minutes, any time of day.' },
  { label: 'Trusted Barbers', desc: 'Every barber is vetted, reviewed, and rated by real customers.' },
  { label: 'Real-time Availability', desc: 'See live slot availability and book the exact time that suits you.' },
  { label: 'Simple Management', desc: 'View, reschedule, or cancel your bookings with ease.' },
];

export default function WhyBookMyCuts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={WHY_IMAGE}
              alt="Premium barbershop environment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
          </div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-6 top-12 bg-white text-black p-5 max-w-[180px]"
          >
            <div className="text-3xl font-black leading-none">500+</div>
            <div className="text-xs font-semibold mt-1 text-black/60">Satisfied clients every month</div>
          </motion.div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-white/30" />
              <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Why BookMyCuts</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              The right barber.<br />
              The right time.<br />
              <span className="text-white/30">The right cut.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {points.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <CheckCircle size={18} className="text-white/60 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm mb-0.5">{p.label}</div>
                  <div className="text-white/40 text-sm leading-relaxed">{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link to="/book" data-hover>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="self-start bg-white text-black font-black text-xs px-8 py-4 tracking-widest hover:bg-white/90 transition-colors"
            >
              BOOK YOUR CUT
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
