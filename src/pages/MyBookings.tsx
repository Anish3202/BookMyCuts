import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

const demoBookings = [
  { id: 'BMC-A3X7K2', service: 'Classic Haircut', barber: 'Arjun Mehta', date: '2026-09-10', time: '10:00 AM', location: 'Ahmedabad, Gujarat', status: 'Upcoming', price: 350 },
  { id: 'BMC-9PQRT5', service: 'Skin Fade', barber: 'Rahul Sharma', date: '2026-08-28', time: '02:00 PM', location: 'Ahmedabad, Gujarat', status: 'Completed', price: 400 },
  { id: 'BMC-LMN8V1', service: 'Beard Trim & Shape', barber: 'Dev Patel', date: '2026-08-15', time: '04:00 PM', location: 'Ahmedabad, Gujarat', status: 'Cancelled', price: 200 },
];

const statusColor: Record<string, string> = {
  Upcoming: 'text-green-400 border-green-400/30',
  Completed: 'text-white/50 border-white/20',
  Cancelled: 'text-red-400/70 border-red-400/20',
};

export default function MyBookings() {
  const upcoming = demoBookings.filter(b => b.status === 'Upcoming');
  const past = demoBookings.filter(b => b.status !== 'Upcoming');

  const BookingCard = ({ b }: { b: typeof demoBookings[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/10 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">{b.service}</h3>
          <p className="text-white/40 text-sm">{b.barber}</p>
        </div>
        <span className={`text-[10px] font-bold tracking-widest border px-2 py-1 ${statusColor[b.status]}`}>{b.status.toUpperCase()}</span>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-white/50 mb-4">
        <div className="flex items-center gap-1.5"><Calendar size={13} />{b.date}</div>
        <div className="flex items-center gap-1.5"><Clock size={13} />{b.time}</div>
        <div className="flex items-center gap-1.5"><MapPin size={13} />{b.location}</div>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-white/30 text-xs">Ref: {b.id}</span>
        <span className="text-white font-bold">₹{b.price}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#080808] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-white/30" />
          <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">My Account</span>
        </div>
        <div className="flex items-end justify-between mb-12">
          <h1 className="text-4xl font-black text-white">My Bookings</h1>
          <Link to="/book" data-hover>
            <button className="bg-white text-black text-xs font-black px-5 py-3 tracking-widest hover:bg-white/90 transition-colors">
              + NEW BOOKING
            </button>
          </Link>
        </div>

        {/* Upcoming */}
        <div className="mb-10">
          <div className="text-xs font-semibold tracking-[0.3em] text-white/30 uppercase mb-4">Upcoming</div>
          {upcoming.length > 0
            ? upcoming.map(b => <BookingCard key={b.id} b={b} />)
            : <p className="text-white/30 text-sm">No upcoming bookings. <Link to="/book" className="text-white underline" data-hover>Book a cut</Link></p>
          }
        </div>

        {/* Past */}
        <div>
          <div className="text-xs font-semibold tracking-[0.3em] text-white/30 uppercase mb-4">Past Bookings</div>
          <div className="flex flex-col gap-4">
            {past.map(b => <BookingCard key={b.id} b={b} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
