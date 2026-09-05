import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, Scissors, Star } from 'lucide-react';
import { GALLERY_CUTS } from '../data/cuts';
import { barbers } from '../data/barbers';

interface QuizState {
  length: string;
  vibe: string;
  faceShape: string;
}

const LENGTH_OPTIONS = [
  { id: 'short', title: 'SHORT & TIGHT', subtitle: 'Skin fades, buzz cuts, low taper' },
  { id: 'medium', title: 'MEDIUM CROWN', subtitle: 'Textured crops, quiffs, fringe' },
  { id: 'long', title: 'LONG & FLOWING', subtitle: 'Slick back, classic side part, shoulder length' }
];

const VIBE_OPTIONS = [
  { id: 'sharp', title: 'SHARP & CLEAN', category: 'MID FADE', desc: 'Precision edge-up and razor sharpness' },
  { id: 'casual', title: 'EFFORTLESS / LOW MAINT', category: 'TEXTURED CROP', desc: 'Wake up, apply matte cream, and go' },
  { id: 'executive', title: 'EXECUTIVE & CLASSIC', category: 'SLICK BACK', desc: 'High-shine, clean lines, polished authority' },
  { id: 'bold', title: 'BOLD & EDGE', category: 'HIGH FADE', desc: 'Maximum contrast, high drop skin fade' }
];

const FACE_SHAPES = [
  { id: 'Oval', name: 'OVAL', desc: 'Balanced proportions, works with all cuts' },
  { id: 'Square', name: 'SQUARE', desc: 'Strong jawline, great for fades & pompadours' },
  { id: 'Round', name: 'ROUND', desc: 'Softer edges, benefits from textured height' },
  { id: 'Diamond', name: 'DIAMOND / HEART', desc: 'Chiseled cheekbones, great for natural volume' }
];

export default function StyleQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    length: '',
    vibe: '',
    faceShape: ''
  });

  const handleSelectLength = (id: string) => {
    setAnswers(prev => ({ ...prev, length: id }));
    setStep(2);
  };

  const handleSelectVibe = (id: string) => {
    setAnswers(prev => ({ ...prev, vibe: id }));
    setStep(3);
  };

  const handleSelectFace = (id: string) => {
    setAnswers(prev => ({ ...prev, faceShape: id }));
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ length: '', vibe: '', faceShape: '' });
  };

  // Logic to pick best cut recommendation based on quiz answers
  const matchedVibe = VIBE_OPTIONS.find(v => v.id === answers.vibe);
  const matchedCut = GALLERY_CUTS.find(c => c.category === matchedVibe?.category) || GALLERY_CUTS[0];
  const recommendedBarber = barbers[0];

  return (
    <section id="style-quiz" className="py-28 bg-[#0D0D0D] border-y border-white/10 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6BBF7A]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6BBF7A]/10 border border-[#6BBF7A]/30 text-[#6BBF7A] text-xs font-anton tracking-widest uppercase mb-4">
            <Sparkles size={14} />
            <span>INTERACTIVE STYLE FINDER</span>
          </div>
          <h2 className="font-anton text-5xl md:text-7xl tracking-tight text-white uppercase leading-none">
            WHAT'S YOUR VIBE?
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-3 max-w-lg mx-auto">
            Find the exact haircut engineered for your face shape, hair length, and personal aesthetic.
          </p>
        </div>

        {/* Quiz Container Box */}
        <div className="bg-[#141414] border border-white/15 p-8 md:p-12 shadow-2xl relative">
          
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-anton text-2xl text-white">0{step}</span>
              <span className="text-white/30 font-anton text-sm">/ 04</span>
            </div>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`w-12 h-1.5 transition-all duration-500 ${
                    s <= step ? 'bg-[#6BBF7A]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {step > 1 && (
              <button
                onClick={resetQuiz}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1 font-mono tracking-wider transition-colors"
                data-hover
              >
                <RotateCcw size={12} />
                <span>RESET</span>
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: HAIR LENGTH */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-anton text-2xl md:text-3xl text-white uppercase mb-2">
                  STEP 1: SELECT YOUR HAIR LENGTH
                </h3>
                <p className="text-white/50 text-sm mb-8">What hair length do you currently have or want to maintain?</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {LENGTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectLength(opt.id)}
                      className="p-6 bg-[#1A1A1A] border border-white/10 text-left hover:border-[#6BBF7A] hover:bg-[#1E1E1E] transition-all group relative"
                      data-hover
                    >
                      <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2 font-mono">OPTION</span>
                      <h4 className="font-anton text-xl text-white uppercase group-hover:text-[#6BBF7A] transition-colors mb-2">
                        {opt.title}
                      </h4>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {opt.subtitle}
                      </p>
                      <div className="mt-6 flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#6BBF7A] group-hover:text-black transition-colors">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: DESIRED VIBE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-anton text-2xl md:text-3xl text-white uppercase mb-2">
                  STEP 2: WHAT'S YOUR DESIRED VIBE?
                </h3>
                <p className="text-white/50 text-sm mb-8">Choose the aesthetic that best represents your everyday style.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {VIBE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectVibe(opt.id)}
                      className="p-6 bg-[#1A1A1A] border border-white/10 text-left hover:border-[#6BBF7A] hover:bg-[#1E1E1E] transition-all group"
                      data-hover
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-[#6BBF7A] font-anton uppercase tracking-widest">
                          {opt.category}
                        </span>
                        <ArrowRight size={16} className="text-white/40 group-hover:text-[#6BBF7A] transition-colors" />
                      </div>
                      <h4 className="font-anton text-2xl text-white uppercase mb-2">
                        {opt.title}
                      </h4>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: FACE SHAPE */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-anton text-2xl md:text-3xl text-white uppercase mb-2">
                  STEP 3: IDENTIFY YOUR FACE SHAPE
                </h3>
                <p className="text-white/50 text-sm mb-8">Selecting your face shape guarantees a flattering side silhouette.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FACE_SHAPES.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => handleSelectFace(shape.id)}
                      className="p-6 bg-[#1A1A1A] border border-white/10 text-left hover:border-[#6BBF7A] hover:bg-[#1E1E1E] transition-all group"
                      data-hover
                    >
                      <h4 className="font-anton text-2xl text-white uppercase mb-2 group-hover:text-[#6BBF7A] transition-colors">
                        {shape.name}
                      </h4>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {shape.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: MATCH RESULT */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-12 gap-8 items-center"
              >
                {/* Image */}
                <div className="md:col-span-5 relative aspect-[4/5] border border-white/20 overflow-hidden shadow-2xl">
                  <img
                    src={matchedCut.image}
                    alt={matchedCut.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#6BBF7A] text-black text-[10px] font-anton px-3 py-1 uppercase tracking-widest">
                    100% STYLE MATCH
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest block">RECOMMENDED LOOK</span>
                    <h4 className="font-anton text-2xl text-white uppercase">{matchedCut.name}</h4>
                  </div>
                </div>

                {/* Match Info */}
                <div className="md:col-span-7 flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-xs font-bold tracking-[0.3em] text-[#6BBF7A] uppercase block mb-2">
                      YOUR PERFECT CUT MATCH IS READY
                    </span>
                    <h3 className="font-anton text-4xl md:text-5xl text-white uppercase leading-none mb-4">
                      {matchedCut.name}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {matchedCut.description}
                    </p>

                    {/* Specs summary */}
                    <div className="bg-[#1A1A1A] p-4 border border-white/10 grid grid-cols-2 gap-4 text-xs mb-6">
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Maintenance Level</span>
                        <strong className="text-white font-anton text-sm">{matchedCut.maintenance}</strong>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Best Face Compatibility</span>
                        <strong className="text-white font-anton text-sm">{answers.faceShape || matchedCut.faceShape}</strong>
                      </div>
                    </div>

                    {/* Recommended Master Barber */}
                    <div className="flex items-center gap-4 p-4 bg-[#1F1F1F] border border-white/10 mb-6">
                      <img
                        src={recommendedBarber.image}
                        alt={recommendedBarber.firstName}
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-sm">{recommendedBarber.firstName} {recommendedBarber.lastName}</span>
                          <span className="flex items-center text-amber-400 text-xs font-bold"><Star size={10} fill="currentColor" /> {recommendedBarber.rating}</span>
                        </div>
                        <span className="text-white/40 text-xs block">{recommendedBarber.specialty} • {recommendedBarber.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to={`/book?cut=${matchedCut.id}&barber=${recommendedBarber.id}`} className="flex-1" data-hover>
                      <button className="w-full py-4 bg-white text-black font-anton text-base tracking-wider uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-xl">
                        <Scissors size={18} />
                        <span>BOOK THIS LOOK NOW</span>
                      </button>
                    </Link>

                    <button
                      onClick={resetQuiz}
                      className="px-6 py-4 bg-white/5 border border-white/15 text-white font-anton text-sm uppercase hover:bg-white/10 transition-colors"
                      data-hover
                    >
                      TRY AGAIN
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
