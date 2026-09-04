import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { Clock } from 'lucide-react';

export default function ServicesPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
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
            <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">All Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4">Our Services</h1>
          <p className="text-white/40 text-lg max-w-xl">Premium grooming services tailored to your style and needs.</p>
        </motion.div>

        <div className="divide-y divide-white/5 border-t border-white/5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: "easeOut" }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8"
            >
              <div className="flex items-start gap-6">
                <span className="text-xs text-white/20 font-mono mt-1 w-6">0{i + 1}</span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    {service.popular && (
                      <span className="text-[10px] font-bold tracking-widest text-black bg-white px-2 py-0.5">POPULAR</span>
                    )}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed max-w-lg">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 md:gap-12 pl-12 md:pl-0 shrink-0">
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock size={13} />
                  <span>{service.duration} min</span>
                </div>
                <span className="text-white font-bold text-xl">₹{service.price}</span>
                <Link to="/book" data-hover>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="border border-white/20 text-white/70 text-xs font-bold tracking-widest px-5 py-2.5 hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    BOOK NOW
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
