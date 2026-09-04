import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1000&auto=format&fit=crop&q=80';

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
      {/* Large BG watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[22vw] font-black text-white/[0.022] leading-none tracking-tighter whitespace-nowrap">
          BOOKMYCUTS
        </span>
      </div>

      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-28 pb-20">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-[1px] bg-white/40" />
            <span className="text-xs font-semibold tracking-[0.3em] text-white/50 uppercase">BookMyCuts</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              <span className="block text-white">Your next</span>
              <span className="block text-white">great cut,</span>
              <span className="block text-white/30">booked.</span>
            </h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.24, duration: 0.9, ease: "easeOut" }}
            className="text-white/50 text-lg leading-relaxed max-w-md"
          >
            Discover trusted barbers, explore styles, and book your next haircut in just a few taps.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.36, duration: 0.9, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link to="/book" data-hover>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-black font-black text-sm px-8 py-4 tracking-widest hover:bg-white/90 transition-colors"
              >
                BOOK A CUT
              </motion.button>
            </Link>
            <Link to="/barbers" data-hover>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-white/60 text-sm font-semibold tracking-widest hover:text-white transition-colors py-4"
              >
                EXPLORE BARBERS
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.48, duration: 0.9, ease: "easeOut" }}
            className="flex items-center gap-10 pt-4 border-t border-white/10"
          >
            {[['4+', 'Expert Barbers'], ['500+', 'Happy Clients'], ['8', 'Services'], ['100%', 'Satisfaction']].map(([num, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-xl font-black text-white">{num}</span>
                <span className="text-xs text-white/40 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Premium barber at work"
              className="w-full h-full object-cover"
            />
            {/* Cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#080808]/30" />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="absolute -left-8 bottom-16 bg-[#111]/90 backdrop-blur-sm border border-white/10 p-4"
          >
            <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Available Now</div>
            <div className="text-white font-bold text-sm">4 Barbers Ready</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/30" />
        <span className="text-[10px] text-white/30 tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
