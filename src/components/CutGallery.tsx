import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GALLERY_CUTS } from '../data/cuts';
import { Scissors, Sparkles, ArrowUpRight, Flame } from 'lucide-react';

const CATEGORIES = ['ALL', 'MID FADE', 'TEXTURED CROP', 'SLICK BACK', 'LOW FADE', 'TAPER', 'BUZZ CUT'];

export default function CutGallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredCuts = activeCategory === 'ALL'
    ? GALLERY_CUTS
    : GALLERY_CUTS.filter(cut => cut.category === activeCategory || cut.name.includes(activeCategory));

  return (
    <section id="cuts-gallery" className="py-28 bg-[#080808] relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden opacity-[0.015]">
        <span className="font-anton text-[28vw] leading-none text-white whitespace-nowrap">
          HAIRCUTS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#F4845F]" />
              <span className="text-xs font-bold tracking-[0.35em] text-[#F4845F] uppercase">
                THE LOOKBOOK
              </span>
            </div>
            <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.9]">
              WHAT'S YOUR CUT?
            </h2>
            <p className="text-white/50 text-base md:text-lg mt-4 max-w-xl font-medium">
              Explore precision hair design. Filter by style, view technical details, and lock in your signature look.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 text-xs font-anton tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white text-black scale-105 shadow-lg'
                    : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                }`}
                data-hover
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Haircut Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCuts.map((cut, idx) => (
              <motion.div
                key={cut.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative bg-[#111111] border border-white/10 overflow-hidden flex flex-col justify-between transition-colors hover:border-white/30"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                  <img
                    src={cut.image}
                    alt={cut.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />

                  {/* Popular Badge */}
                  {cut.popular && (
                    <div className="absolute top-4 left-4 bg-[#F4845F] text-black text-[10px] font-anton px-2.5 py-1 tracking-widest uppercase flex items-center gap-1 shadow-md z-10">
                      <Flame size={12} />
                      <span>POPULAR</span>
                    </div>
                  )}

                  {/* Price Tag Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-bold px-3 py-1 tracking-wider z-10">
                    ₹350 - ₹650
                  </div>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
                    <span className="text-[10px] font-anton tracking-[0.3em] text-[#6BBF7A] uppercase mb-2">
                      {cut.category}
                    </span>
                    <h3 className="font-anton text-2xl text-white uppercase mb-3">
                      {cut.name}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed mb-6 line-clamp-3">
                      {cut.description}
                    </p>
                    <Link to={`/book?cut=${cut.id}`} className="w-full" data-hover>
                      <button className="w-full py-3 bg-white text-black font-anton text-sm tracking-wider uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                        <Scissors size={14} />
                        <span>BOOK THIS CUT</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="p-5 flex flex-col justify-between gap-3 bg-[#111111] z-10">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">
                        {cut.category}
                      </span>
                      <span className="text-[10px] font-bold text-white/60 tracking-wider">
                        {cut.maintenance} MAINT.
                      </span>
                    </div>
                    <h3 className="font-anton text-xl text-white tracking-wide uppercase group-hover:text-[#F4845F] transition-colors flex items-center justify-between">
                      <span>{cut.name}</span>
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
                    <span>Face: <strong className="text-white/80">{cut.faceShape}</strong></span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase flex items-center gap-2 mb-2">
              <Sparkles size={14} />
              NOT SURE WHICH CUT SUITS YOU?
            </span>
            <h3 className="font-anton text-3xl md:text-4xl text-white uppercase">
              TAKE THE INTERACTIVE STYLE QUIZ
            </h3>
            <p className="text-white/60 text-sm mt-1 max-w-xl">
              Answer 3 simple questions about your hair type, lifestyle, and vibe to find your optimal haircut match.
            </p>
          </div>
          <a
            href="#style-quiz"
            className="px-8 py-4 bg-white text-black font-anton text-base tracking-wider uppercase hover:bg-neutral-200 transition-all shrink-0 flex items-center gap-3 shadow-xl"
            data-hover
          >
            <span>START VIBE QUIZ</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
