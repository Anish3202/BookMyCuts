import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { barbers } from '../data/barbers';
import { Star, Clock } from 'lucide-react';

export default function BarbersPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen bg-[#080808] pt-36 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-white/30" />
            <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Our Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4">Our Barbers</h1>
          <p className="text-white/40 text-lg max-w-xl">Every barber on BookMyCuts is handpicked for skill, professionalism, and consistency.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {barbers.map((barber, i) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group bg-[#080808] flex flex-col md:flex-row gap-0 overflow-hidden"
            >
              {/* Image */}
              <div className="w-full md:w-48 aspect-square md:aspect-auto overflow-hidden shrink-0">
                <img
                  src={barber.image}
                  alt={`${barber.firstName} ${barber.lastName}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between p-6 border border-white/5 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{barber.firstName} {barber.lastName}</h3>
                    {barber.available ? (
                      <span className="text-[10px] font-bold text-green-400 tracking-widest border border-green-400/30 px-2 py-0.5">AVAILABLE</span>
                    ) : (
                      <span className="text-[10px] font-bold text-white/30 tracking-widest border border-white/10 px-2 py-0.5">BUSY</span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mb-3">{barber.specialty}</p>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{barber.bio}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-white/50">
                      <Star size={12} fill="currentColor" />
                      <span>{barber.rating}</span>
                      <span className="text-white/30">({barber.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/40">
                      <Clock size={12} />
                      <span>{barber.experience} yrs exp</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-white/40 text-sm">From <span className="text-white font-bold">₹{barber.startingPrice}</span></span>
                  <Link to="/book" data-hover>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-white text-black text-xs font-black tracking-widest px-4 py-2 hover:bg-white/90 transition-colors"
                    >
                      BOOK WITH {barber.firstName.toUpperCase()}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
