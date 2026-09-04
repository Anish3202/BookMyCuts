import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { barbers } from '../data/barbers';
import { Star, ArrowRight } from 'lucide-react';

export default function BarbersPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-white/30" />
              <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Our Barbers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Find your<br />barber.
            </h2>
            <p className="text-white/40 mt-4 text-lg">Great cuts start with the right barber.</p>
          </div>
          <Link to="/barbers" data-hover className="flex items-center gap-2 text-white/50 text-sm font-semibold tracking-widest hover:text-white transition-colors shrink-0">
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {barbers.map((barber, i) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group bg-[#0a0a0a] relative overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={barber.image}
                  alt={`${barber.firstName} ${barber.lastName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1 mb-1">
                  <Star size={10} fill="white" className="text-white" />
                  <span className="text-xs text-white/70">{barber.rating} ({barber.reviewCount})</span>
                  {barber.available ? (
                    <span className="ml-auto text-[10px] font-bold text-green-400 tracking-widest">AVAILABLE</span>
                  ) : (
                    <span className="ml-auto text-[10px] font-bold text-white/30 tracking-widest">BUSY</span>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight">{barber.firstName} {barber.lastName}</h3>
                <p className="text-white/50 text-xs mt-0.5 mb-3">{barber.specialty}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">From ₹{barber.startingPrice}</span>
                  <Link to="/book" data-hover>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-[10px] font-black tracking-widest bg-white text-black px-3 py-1.5 hover:bg-white/90 transition-colors"
                    >
                      BOOK
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
