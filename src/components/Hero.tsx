import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Scissors, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/cuts';

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentSlide = HERO_SLIDES[activeIdx];
  const timerRef = useRef<number | null>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const scrollToQuiz = () => {
    const el = document.getElementById('style-quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] max-h-[1080px] bg-[#0A0A0A] overflow-hidden flex flex-col justify-between select-none">
      {/* Dynamic Background Glow matching current theme */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 70% 40%, ${currentSlide.colorTheme} 0%, transparent 60%)`
          }}
        />
      </AnimatePresence>

      {/* Clamped Giant Ghost Anton Text Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentSlide.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 0.04, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-anton leading-none tracking-tighter text-white uppercase whitespace-nowrap"
            style={{ fontSize: 'clamp(100px, 28vw, 420px)' }}
          >
            {currentSlide.heroTitle}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Subtle Grain Overlay & Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40 z-[1] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full h-full flex flex-col justify-center pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
          
          {/* LEFT COLUMN: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-6">
            
            {/* Tagline & Slide indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-10 h-[2px]"
                style={{ backgroundColor: currentSlide.colorTheme }}
              />
              <span className="text-xs font-bold tracking-[0.35em] text-white/70 uppercase">
                {currentSlide.category} • LOOK {String(activeIdx + 1).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="relative overflow-hidden min-h-[140px] md:min-h-[180px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.88] drop-shadow-2xl">
                    {currentSlide.name}
                  </h1>
                  <p className="text-lg md:text-xl font-medium tracking-wide mt-3 text-white/80" style={{ color: currentSlide.colorTheme }}>
                    {currentSlide.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg"
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

            {/* Specifications Strip */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center gap-6 py-3 border-y border-white/10 max-w-lg"
              >
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Maintenance</span>
                  <span className="text-xs font-bold text-white tracking-wider">{currentSlide.maintenance}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Best Face Shape</span>
                  <span className="text-xs font-bold text-white tracking-wider">{currentSlide.faceShape}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Avg Price</span>
                  <span className="text-xs font-bold text-white tracking-wider">₹450 - ₹750</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/book" data-hover>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-white text-black font-anton text-lg tracking-wider uppercase transition-all shadow-xl hover:bg-[#F7F5F0] flex items-center gap-3"
                >
                  <Scissors size={18} strokeWidth={2.5} />
                  <span>BOOK THE LOOK</span>
                </motion.button>
              </Link>

              <motion.button
                onClick={scrollToQuiz}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-4 bg-white/5 border border-white/20 text-white font-anton text-base tracking-wider uppercase hover:bg-white/10 transition-all flex items-center gap-2"
                data-hover
              >
                <Sparkles size={16} className="text-amber-400" />
                <span>STYLE QUIZ</span>
              </motion.button>
            </div>

          </div>

          {/* RIGHT COLUMN: Layered Model Photography Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-[380px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl border border-white/10 group"
              >
                <img
                  src={currentSlide.modelMain}
                  alt={currentSlide.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Image Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Fashion Label */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                  <div>
                    <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] block">EDITORIAL CUT</span>
                    <span className="font-anton text-xl text-white tracking-wide uppercase">{currentSlide.name}</span>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: currentSlide.colorTheme }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Secondary Thumbnail Preview Card Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -right-4 bottom-8 hidden md:block w-36 aspect-[3/4] overflow-hidden border-2 border-white/20 shadow-2xl z-20 backdrop-blur-md"
            >
              <img
                src={currentSlide.modelSide1}
                alt="Angle detail"
                className="w-full h-full object-cover filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-black/40 p-2 flex items-end">
                <span className="text-[9px] font-mono text-white/80 uppercase tracking-widest">ANGLE 02</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Editorial Navigation Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Editorial Counter */}
          <div className="flex items-center gap-4">
            <span className="font-anton text-2xl text-white tracking-widest">
              0{activeIdx + 1}
            </span>
            <div className="w-12 h-[2px] bg-white/20 relative overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: currentSlide.colorTheme }}
                initial={{ width: '0%' }}
                animate={{ width: `${((activeIdx + 1) / HERO_SLIDES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="font-anton text-sm text-white/40 tracking-widest">
              0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Quick Slide Selector Tabs */}
          <div className="hidden md:flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 text-xs font-anton tracking-wider uppercase transition-all ${
                  activeIdx === idx
                    ? 'text-black bg-white shadow-md scale-105'
                    : 'text-white/40 hover:text-white bg-white/5'
                }`}
                data-hover
              >
                {slide.heroTitle}
              </button>
            ))}
          </div>

          {/* 64px Circular Arrow Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              aria-label="Previous Look"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
              data-hover
            >
              <ArrowLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              aria-label="Next Look"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
              data-hover
            >
              <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
