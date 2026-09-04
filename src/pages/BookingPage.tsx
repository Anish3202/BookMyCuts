import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { barbers, timeSlots } from '../data/barbers';
import type { BookingState } from '../types';
import { CheckCircle, Clock, Star, ChevronRight } from 'lucide-react';

const steps = ['Service', 'Barber', 'Date & Time', 'Confirm'];

const defaultState: BookingState = { service: null, barber: null, date: '', time: '', name: '', phone: '', notes: '' };

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-16">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center gap-2 ${i < current ? 'text-white' : i === current ? 'text-white' : 'text-white/20'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${i < current ? 'bg-white text-black border-white' : i === current ? 'border-white text-white' : 'border-white/20 text-white/20'}`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className="text-xs font-semibold tracking-widest hidden md:block">{step.toUpperCase()}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-8 md:w-16 h-[1px] mx-3 ${i < current ? 'bg-white' : 'bg-white/10'}`} />}
        </div>
      ))}
    </div>
  );
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingState>(defaultState);
  const [confirmed, setConfirmed] = useState(false);
  const [refId] = useState('BMC-' + Math.random().toString(36).substring(2, 8).toUpperCase());

  const canNext = () => {
    if (step === 0) return !!booking.service;
    if (step === 1) return !!booking.barber;
    if (step === 2) return !!booking.date && !!booking.time;
    if (step === 3) return !!booking.name && !!booking.phone;
    return false;
  };

  const handleConfirm = () => { setConfirmed(true); };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#080808] pt-28 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={32} className="text-black" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">YOU'RE BOOKED.</h1>
          <p className="text-white/50 mb-8">Your appointment is confirmed.</p>
          <div className="border border-white/10 p-6 text-left mb-8 space-y-3">
            {[
              ['Ref ID', refId],
              ['Service', booking.service?.name],
              ['Barber', `${booking.barber?.firstName} ${booking.barber?.lastName}`],
              ['Date', booking.date],
              ['Time', booking.time],
              ['Location', 'Ahmedabad, Gujarat'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-white/40">{label}</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setStep(0); setBooking(defaultState); setConfirmed(false); }}
            className="bg-white text-black font-black text-xs px-8 py-4 tracking-widest hover:bg-white/90 transition-colors"
            data-hover
          >
            BOOK ANOTHER CUT
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-white/30" />
            <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">Book a Cut</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-12">Book Your Appointment</h1>
          <StepIndicator current={step} />
        </motion.div>

        <AnimatePresence mode="wait">
          {/* STEP 0 — Service */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-white mb-6">Choose a Service</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {services.map(s => (
                  <button
                    key={s.id}
                    data-hover
                    onClick={() => setBooking({ ...booking, service: s })}
                    className={`text-left p-5 border transition-all ${booking.service?.id === s.id ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-bold">{s.name}</span>
                      {s.popular && <span className="text-[9px] font-black bg-white text-black px-1.5">POPULAR</span>}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-white/40 text-xs flex items-center gap-1"><Clock size={11} />{s.duration} min</span>
                      <span className="text-white font-bold text-sm">₹{s.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Barber */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-white mb-6">Choose Your Barber</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {barbers.map(b => (
                  <button
                    key={b.id}
                    data-hover
                    onClick={() => setBooking({ ...booking, barber: b })}
                    className={`text-left flex gap-4 p-4 border transition-all ${booking.barber?.id === b.id ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <img src={b.image} alt={b.firstName} className="w-16 h-16 object-cover shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-bold text-sm">{b.firstName} {b.lastName}</span>
                        {b.available
                          ? <span className="text-[9px] text-green-400 font-bold">AVAILABLE</span>
                          : <span className="text-[9px] text-white/30 font-bold">BUSY</span>}
                      </div>
                      <p className="text-white/40 text-xs mb-1">{b.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Star size={10} fill="currentColor" />{b.rating} · From ₹{b.startingPrice}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Date & Time */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-white mb-6">Choose Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-3">Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setBooking({ ...booking, date: e.target.value })}
                    className="bg-transparent border border-white/10 text-white text-sm w-full p-3 outline-none focus:border-white/40 transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 tracking-widest uppercase block mb-3">Available Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(t => (
                      <button
                        key={t}
                        data-hover
                        onClick={() => setBooking({ ...booking, time: t })}
                        className={`text-xs py-2.5 border transition-all ${booking.time === t ? 'bg-white text-black border-white font-bold' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Confirm */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-white mb-6">Confirm Booking</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Summary */}
                <div className="border border-white/10 p-6 space-y-3">
                  <div className="text-xs text-white/40 tracking-widest uppercase mb-4">Booking Summary</div>
                  {[
                    ['Service', booking.service?.name],
                    ['Duration', `${booking.service?.duration} min`],
                    ['Price', `₹${booking.service?.price}`],
                    ['Barber', `${booking.barber?.firstName} ${booking.barber?.lastName}`],
                    ['Date', booking.date],
                    ['Time', booking.time],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-white/40">{l}</span>
                      <span className="text-white font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={booking.name}
                      onChange={e => setBooking({ ...booking, name: e.target.value })}
                      className="w-full bg-transparent border border-white/10 text-white text-sm p-3 outline-none focus:border-white/40 placeholder-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Phone *</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={booking.phone}
                      onChange={e => setBooking({ ...booking, phone: e.target.value })}
                      className="w-full bg-transparent border border-white/10 text-white text-sm p-3 outline-none focus:border-white/40 placeholder-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 tracking-widest uppercase block mb-2">Notes (optional)</label>
                    <textarea
                      placeholder="Any special requests..."
                      value={booking.notes}
                      onChange={e => setBooking({ ...booking, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-transparent border border-white/10 text-white text-sm p-3 outline-none focus:border-white/40 placeholder-white/20 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              data-hover
              className="text-white/50 text-xs font-bold tracking-widest hover:text-white transition-colors"
            >
              ← BACK
            </button>
          ) : <div />}

          {step < 3 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => canNext() && setStep(step + 1)}
              data-hover
              className={`flex items-center gap-2 text-xs font-black tracking-widest px-8 py-4 transition-all ${canNext() ? 'bg-white text-black hover:bg-white/90' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
            >
              CONTINUE <ChevronRight size={14} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => canNext() && handleConfirm()}
              data-hover
              className={`flex items-center gap-2 text-xs font-black tracking-widest px-8 py-4 transition-all ${canNext() ? 'bg-white text-black hover:bg-white/90' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
            >
              CONFIRM BOOKING <CheckCircle size={14} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
