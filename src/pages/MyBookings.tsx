import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { QrCode, Scissors } from 'lucide-react';

const demoBookings = [
  { id: 'BMC-A3X7K2', cutName: 'MID FADE', service: 'Mid Fade Haircut', barber: 'Arjun Mehta', date: '2026-09-10', time: '10:00 AM', location: 'Ahmedabad, Gujarat', status: 'Upcoming', price: 350, customerName: 'Anish Patel' },
  { id: 'BMC-9PQRT5', cutName: 'TEXTURED CROP', service: 'Textured Crop', barber: 'Rahul Sharma', date: '2026-08-28', time: '02:00 PM', location: 'Ahmedabad, Gujarat', status: 'Completed', price: 400, customerName: 'Anish Patel' },
  { id: 'BMC-LMN8V1', cutName: 'SLICK BACK', service: 'Beard Trim & Shape', barber: 'Dev Patel', date: '2026-08-15', time: '04:00 PM', location: 'Ahmedabad, Gujarat', status: 'Cancelled', price: 200, customerName: 'Anish Patel' },
];

export default function MyBookings() {
  const [userBookings, setUserBookings] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmycuts_bookings') || '[]');
    setUserBookings([...saved, ...demoBookings]);
  }, []);

  const handleCancel = (id: string) => {
    const updated = userBookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
    setUserBookings(updated);
    const savedLocal = updated.filter(b => !demoBookings.some(d => d.id === b.id));
    localStorage.setItem('bookmycuts_bookings', JSON.stringify(savedLocal));
  };

  const upcoming = userBookings.filter(b => b.status === 'Upcoming');
  const past = userBookings.filter(b => b.status !== 'Upcoming');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-36 pb-24 select-none">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Scissors size={18} className="text-[#6BBF7A]" />
              <span className="text-xs font-bold tracking-[0.35em] text-[#6BBF7A] uppercase">MY PASS PORTFOLIO</span>
            </div>
            <h1 className="font-anton text-4xl md:text-6xl uppercase tracking-tight">MY DIGITAL PASSES</h1>
          </div>
          
          <Link to="/book" data-hover>
            <button className="px-6 py-3 bg-white text-black font-anton text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg">
              + BOOK NEW APPOINTMENT
            </button>
          </Link>
        </div>

        {/* Upcoming Passes */}
        <div className="mb-16">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-white mb-6">
            UPCOMING APPOINTMENTS ({upcoming.length})
          </h2>

          {upcoming.length === 0 ? (
            <div className="bg-[#141414] border border-white/10 p-12 text-center">
              <p className="text-white/40 text-sm mb-4">No upcoming active appointments.</p>
              <Link to="/book" className="px-6 py-3 bg-white/10 text-white font-anton text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors" data-hover>
                BOOK A CUT NOW
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {upcoming.map(b => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#141414] border-2 border-white/20 p-6 md:p-8 shadow-2xl relative overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">PASS REF: #{b.id}</span>
                      <h3 className="font-anton text-2xl text-white uppercase">{b.cutName || b.service}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 font-anton text-xs tracking-widest uppercase">
                        UPCOMING
                      </span>
                      <button onClick={() => handleCancel(b.id)} className="text-xs text-red-400 hover:underline" data-hover>
                        CANCEL
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-6">
                    <div>
                      <span className="text-white/40 uppercase block text-[10px]">Barber</span>
                      <span className="font-bold text-white text-sm">{b.barber}</span>
                    </div>
                    <div>
                      <span className="text-white/40 uppercase block text-[10px]">Date & Time</span>
                      <span className="font-bold text-[#F4845F] text-sm">{b.date} @ {b.time}</span>
                    </div>
                    <div>
                      <span className="text-white/40 uppercase block text-[10px]">Location</span>
                      <span className="font-bold text-white text-sm">{b.location}</span>
                    </div>
                  </div>

                  {/* QR Code Bar */}
                  <div className="bg-white text-black p-3 flex items-center justify-between">
                    <span className="font-anton text-xs uppercase tracking-wider">SHOW AT RECEPTION</span>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <QrCode size={24} />
                      <span>{b.id}</span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <h2 className="font-anton text-2xl uppercase tracking-wider text-white/50 mb-6">
            PAST APPOINTMENT HISTORY ({past.length})
          </h2>

          <div className="space-y-4">
            {past.map(b => (
              <div key={b.id} className="bg-[#121212] border border-white/10 p-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-anton text-lg text-white uppercase block">{b.service}</span>
                  <span className="text-white/40">{b.barber} • {b.date}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 font-anton text-[10px] uppercase border ${
                    b.status === 'Completed' ? 'text-white/50 border-white/20' : 'text-red-400 border-red-400/30'
                  }`}>
                    {b.status}
                  </span>
                  <span className="font-anton text-sm text-white">₹{b.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
