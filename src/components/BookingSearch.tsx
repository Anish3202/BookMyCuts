import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Scissors } from 'lucide-react';

const serviceTypes = ['Haircut', 'Beard Trim', 'Hair Styling', 'Hair Spa', 'Kids Haircut'];

export default function BookingSearch() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const [selected, setSelected] = useState('Haircut');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleFind = () => { navigate('/book'); };

  return (
    <section ref={ref} className="bg-[#0d0d0d] border-y border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-xs font-semibold tracking-[0.3em] text-white/30 uppercase mb-6">Quick Book</div>

          <div className="grid md:grid-cols-4 gap-0 border border-white/10">
            {/* Service type */}
            <div className="border-r border-white/10 p-6">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-4">
                <Scissors size={12} />
                Service
              </div>
              <div className="flex flex-col gap-2">
                {serviceTypes.map((s) => (
                  <button
                    key={s}
                    data-hover
                    onClick={() => setSelected(s)}
                    className={`text-left text-sm py-1 transition-colors ${selected === s ? 'text-white font-semibold' : 'text-white/40 hover:text-white/70'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="border-r border-white/10 p-6">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-4">
                <Calendar size={12} />
                Date
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-transparent text-white text-sm w-full outline-none border-b border-white/10 pb-2 [color-scheme:dark]"
              />
            </div>

            {/* Time */}
            <div className="border-r border-white/10 p-6">
              <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-4">
                <Clock size={12} />
                Time
              </div>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent text-white text-sm w-full outline-none border-b border-white/10 pb-2 [color-scheme:dark]"
              >
                <option value="" className="bg-[#111]">Select time</option>
                {['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM'].map(t => (
                  <option key={t} value={t} className="bg-[#111]">{t}</option>
                ))}
              </select>
            </div>

            {/* Find */}
            <div className="p-6 flex flex-col justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFind}
                data-hover
                className="w-full bg-white text-black font-black text-xs tracking-widest py-4 hover:bg-white/90 transition-colors"
              >
                FIND SLOTS
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
