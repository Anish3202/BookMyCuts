import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { Clock, ArrowRight } from 'lucide-react';

const popular = services.filter(s => s.popular);

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-white/30" />
              <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Everything you need<br />to look your best.
            </h2>
          </div>
          <Link to="/services" data-hover className="flex items-center gap-2 text-white/50 text-sm font-semibold tracking-widest hover:text-white transition-colors shrink-0">
            ALL SERVICES <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Services list */}
        <div className="divide-y divide-white/5">
          {popular.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-7 cursor-pointer"
              data-hover
            >
              <div className="flex items-start gap-6">
                <span className="text-xs text-white/20 font-mono mt-1">0{i + 1}</span>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-white/70 transition-colors">{service.name}</h3>
                    {service.popular && (
                      <span className="text-[10px] font-bold tracking-widest text-black bg-white px-2 py-0.5">POPULAR</span>
                    )}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed max-w-md">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 md:gap-12 pl-10 md:pl-0">
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock size={13} />
                  <span>{service.duration} min</span>
                </div>
                <span className="text-white font-bold text-lg">₹{service.price}</span>
                <Link to="/book" data-hover>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="border border-white/20 text-white/70 text-xs font-bold tracking-widest px-4 py-2 hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    BOOK
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
