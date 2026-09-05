import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { barbers, TIME_SLOTS } from '../data/barbers';
import { GALLERY_CUTS } from '../data/cuts';
import { CheckCircle2, Clock, Star, ChevronRight, Scissors, QrCode } from 'lucide-react';

const steps = ['Haircut / Service', 'Master Barber', 'Date & Slot', 'Customer Pass'];

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  const initialCutId = searchParams.get('cut');
  const initialBarberId = searchParams.get('barber');
  const initialServiceId = searchParams.get('service');
  const initialTime = searchParams.get('time');

  const selectedCut = GALLERY_CUTS.find(c => c.id === initialCutId);
  const selectedBarber = barbers.find(b => b.id === initialBarberId);
  const selectedService = services.find(s => s.id === initialServiceId);

  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({
    service: selectedService || services[0],
    barber: selectedBarber || null as any,
    date: new Date().toISOString().split('T')[0],
    time: initialTime || '',
    name: '',
    phone: '',
    notes: selectedCut ? `Selected Cut Style: ${selectedCut.name}` : ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  useEffect(() => {
    if (selectedCut && !selectedService) {
      setBooking(prev => ({ ...prev, service: services[0] }));
    }
  }, [selectedCut, selectedService]);

  const canNext = () => {
    if (step === 0) return !!booking.service;
    if (step === 1) return !!booking.barber;
    if (step === 2) return !!booking.date && !!booking.time;
    if (step === 3) return !!booking.name && !!booking.phone;
    return false;
  };

  const handleConfirmBooking = () => {
    const refId = 'BMC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBookingObj = {
      id: refId,
      cutName: selectedCut?.name || booking.service?.name,
      service: booking.service?.name,
      serviceId: booking.service?.id,
      barber: `${booking.barber?.firstName} ${booking.barber?.lastName}`,
      barberImage: booking.barber?.image,
      date: booking.date,
      time: booking.time,
      location: booking.barber?.location || 'Ahmedabad, Gujarat',
      status: 'Upcoming',
      price: booking.service?.price || 400,
      customerName: booking.name,
      customerPhone: booking.phone,
      notes: booking.notes,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('bookmycuts_bookings') || '[]');
    localStorage.setItem('bookmycuts_bookings', JSON.stringify([newBookingObj, ...existing]));

    setConfirmedBooking(newBookingObj);
  };

  if (confirmedBooking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-36 pb-24 flex items-center justify-center select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl w-full mx-[#141414] px-6"
        >
          {/* Digital Ticket Pass Card */}
          <div className="bg-[#141414] border-2 border-white/20 p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Pass Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-2">
                <Scissors size={20} className="text-[#F4845F]" />
                <span className="font-anton text-2xl tracking-wider text-white uppercase">BOOKMYCUTS PASS</span>
              </div>
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 font-anton text-xs uppercase tracking-widest">
                CONFIRMED
              </span>
            </div>

            {/* Main Pass Info */}
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4 bg-[#1F1F1F] p-4 border border-white/10">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block font-mono">PASS REF</span>
                  <span className="font-anton text-lg text-white">{confirmedBooking.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block font-mono">CLIENT NAME</span>
                  <span className="font-bold text-sm text-white">{confirmedBooking.customerName}</span>
                </div>
              </div>

              <div className="border-y border-white/10 py-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">SERVICE / LOOK:</span>
                  <span className="font-bold text-white uppercase">{confirmedBooking.cutName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">MASTER BARBER:</span>
                  <span className="font-bold text-white">{confirmedBooking.barber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">DATE & TIME:</span>
                  <span className="font-bold text-[#F4845F]">{confirmedBooking.date} @ {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">LOCATION:</span>
                  <span className="text-white/80">{confirmedBooking.location}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-base">
                  <span className="text-white">TOTAL PRICE:</span>
                  <span className="text-white font-anton text-xl">₹{confirmedBooking.price}</span>
                </div>
              </div>
            </div>

            {/* QR Code & Barcode Mockup */}
            <div className="bg-white text-black p-4 flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-anton text-xs uppercase tracking-widest block">PRESENT AT BARBER SHOP</span>
                <span className="font-mono text-[10px] text-black/60 block mt-0.5">SCAN FOR INSTANT CHECK-IN</span>
              </div>
              <QrCode size={42} strokeWidth={1.5} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/bookings" className="flex-1" data-hover>
                <button className="w-full py-4 bg-white text-black font-anton text-sm tracking-wider uppercase hover:bg-neutral-200 transition-colors">
                  VIEW ALL MY PASSES
                </button>
              </Link>
              <button
                onClick={() => { setStep(0); setConfirmedBooking(null); }}
                className="px-6 py-4 bg-white/10 text-white font-anton text-sm uppercase hover:bg-white/20 transition-colors"
                data-hover
              >
                BOOK ANOTHER
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-36 pb-24 select-none">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Scissors size={18} className="text-[#F4845F]" />
            <span className="text-xs font-bold tracking-[0.35em] text-[#F4845F] uppercase">RESERVATION SYSTEM</span>
          </div>
          <h1 className="font-anton text-4xl md:text-6xl uppercase tracking-tight">BOOK YOUR APPOINTMENT</h1>
        </div>

        {/* Selected Cut Banner Notification if navigated from lookbook */}
        {selectedCut && (
          <div className="mb-8 p-4 bg-[#F4845F]/10 border border-[#F4845F]/30 flex items-center gap-4">
            <img src={selectedCut.image} alt={selectedCut.name} className="w-12 h-12 object-cover border border-white/20" />
            <div>
              <span className="text-[10px] text-[#F4845F] font-anton uppercase tracking-widest block">PRE-SELECTED LOOK</span>
              <h3 className="font-anton text-lg text-white uppercase">{selectedCut.name}</h3>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          {steps.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-anton text-xs ${
                step === idx ? 'bg-white text-black' : step > idx ? 'bg-[#6BBF7A] text-black' : 'bg-white/10 text-white/40'
              }`}>
                {step > idx ? '✓' : idx + 1}
              </div>
              <span className={`text-xs font-anton tracking-wider uppercase hidden sm:block ${
                step === idx ? 'text-white' : 'text-white/40'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          {/* STEP 0: SERVICE */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-anton text-2xl uppercase mb-4">STEP 1: CHOOSE SERVICE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setBooking({ ...booking, service: s })}
                    className={`p-5 text-left border transition-all ${
                      booking.service?.id === s.id
                        ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                        : 'bg-[#141414] text-white border-white/10 hover:border-white/30'
                    }`}
                    data-hover
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-anton text-xl uppercase">{s.name}</h3>
                      <span className="font-anton text-lg">₹{s.price}</span>
                    </div>
                    <p className={`text-xs mb-3 ${booking.service?.id === s.id ? 'text-black/70' : 'text-white/50'}`}>{s.description}</p>
                    <span className="text-[10px] font-mono tracking-wider uppercase opacity-60 flex items-center gap-1">
                      <Clock size={11} /> {s.duration} MIN DURATION
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1: BARBER */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-anton text-2xl uppercase mb-4">STEP 2: SELECT MASTER BARBER</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barbers.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBooking({ ...booking, barber: b })}
                    className={`p-4 text-left border transition-all flex items-center gap-4 ${
                      booking.barber?.id === b.id
                        ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                        : 'bg-[#141414] text-white border-white/10 hover:border-white/30'
                    }`}
                    data-hover
                  >
                    <img src={b.image} alt={b.firstName} className="w-16 h-16 object-cover border border-white/20 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-anton text-lg uppercase">{b.firstName} {b.lastName}</h3>
                        <span className="flex items-center gap-0.5 text-xs text-amber-400 font-bold"><Star size={10} fill="currentColor" /> {b.rating}</span>
                      </div>
                      <p className={`text-xs ${booking.barber?.id === b.id ? 'text-black/70' : 'text-white/50'}`}>{b.specialty}</p>
                      <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">{b.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-anton text-2xl uppercase mb-4">STEP 3: SELECT DATE & TIME SLOT</h2>
              <div className="grid md:grid-cols-2 gap-8 bg-[#141414] border border-white/10 p-6">
                <div>
                  <label className="text-xs font-anton uppercase tracking-widest text-white/50 block mb-2">DATE</label>
                  <input
                    type="date"
                    value={booking.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setBooking({ ...booking, date: e.target.value })}
                    className="w-full bg-[#1F1F1F] border border-white/20 text-white p-3 font-mono text-sm focus:outline-none focus:border-white [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="text-xs font-anton uppercase tracking-widest text-white/50 block mb-2">AVAILABLE SLOTS</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((t: string) => (
                      <button
                        key={t}
                        onClick={() => setBooking({ ...booking, time: t })}
                        className={`py-2.5 text-xs font-anton tracking-wider uppercase border transition-all ${
                          booking.time === t
                            ? 'bg-white text-black border-white'
                            : 'bg-[#1F1F1F] text-white/60 border-white/10 hover:border-white/30'
                        }`}
                        data-hover
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CUSTOMER CONFIRMATION */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-anton text-2xl uppercase mb-4">STEP 4: CLIENT DETAILS</h2>
              <div className="grid md:grid-cols-12 gap-8">
                {/* Summary */}
                <div className="md:col-span-5 bg-[#141414] border border-white/10 p-6 space-y-3">
                  <span className="text-[10px] font-anton text-[#F4845F] uppercase tracking-widest block">APPOINTMENT SUMMARY</span>
                  <div className="border-y border-white/10 py-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/40">SERVICE:</span>
                      <span className="font-bold text-white uppercase">{booking.service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">BARBER:</span>
                      <span className="font-bold text-white">{booking.barber?.firstName} {booking.barber?.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">DATE:</span>
                      <span className="font-bold text-white">{booking.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">TIME:</span>
                      <span className="font-bold text-[#F4845F]">{booking.time}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-base font-anton pt-2">
                    <span>TOTAL PRICE:</span>
                    <span>₹{booking.service?.price}</span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <label className="text-xs font-anton uppercase text-white/50 block mb-1">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      placeholder="e.g. Anish Patel"
                      value={booking.name}
                      onChange={e => setBooking({ ...booking, name: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-anton uppercase text-white/50 block mb-1">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={booking.phone}
                      onChange={e => setBooking({ ...booking, phone: e.target.value })}
                      className="w-full bg-[#141414] border border-white/20 p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-anton uppercase text-white/50 block mb-1">SPECIAL REQUEST / NOTES</label>
                    <textarea
                      placeholder="Any specific styling instructions..."
                      value={booking.notes}
                      onChange={e => setBooking({ ...booking, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-[#141414] border border-white/20 p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-anton uppercase tracking-widest text-white/50 hover:text-white"
              data-hover
            >
              ← PREVIOUS STEP
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              disabled={!canNext()}
              onClick={() => canNext() && setStep(step + 1)}
              className={`px-8 py-4 font-anton text-sm tracking-wider uppercase transition-all flex items-center gap-2 ${
                canNext()
                  ? 'bg-white text-black hover:bg-neutral-200 shadow-xl'
                  : 'bg-white/10 text-white/20 cursor-not-allowed'
              }`}
              data-hover
            >
              <span>NEXT STEP</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              disabled={!canNext()}
              onClick={() => canNext() && handleConfirmBooking()}
              className={`px-8 py-4 font-anton text-base tracking-wider uppercase transition-all flex items-center gap-2 ${
                canNext()
                  ? 'bg-[#6BBF7A] text-black hover:bg-emerald-400 shadow-xl'
                  : 'bg-white/10 text-white/20 cursor-not-allowed'
              }`}
              data-hover
            >
              <CheckCircle2 size={18} />
              <span>GENERATE DIGITAL PASS</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
