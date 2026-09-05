import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { barbers, TIME_SLOTS } from '../data/barbers';
import { services } from '../data/services';
import { Star, MapPin, Clock, Scissors, ArrowLeft } from 'lucide-react';

export default function BarberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const barber = barbers.find(b => b.id === id) || barbers[0];

  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);

  const service = services.find(s => s.id === selectedServiceId) || services[0];

  const handleProceedToBooking = () => {
    navigate(`/book?barber=${barber.id}&service=${service.id}&time=${encodeURIComponent(selectedTimeSlot)}`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-24 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Back Link */}
        <Link to="/barbers" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-anton tracking-widest uppercase mb-8 transition-colors" data-hover>
          <ArrowLeft size={16} />
          <span>BACK TO BARBERS</span>
        </Link>

        {/* Top Header Card */}
        <div className="grid lg:grid-cols-12 gap-12 bg-[#121212] border border-white/10 p-8 lg:p-12 mb-12 shadow-2xl">
          {/* Barber Main Photo */}
          <div className="lg:col-span-5 relative aspect-[4/5] border border-white/15 overflow-hidden">
            <img
              src={barber.image}
              alt={barber.firstName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/15 text-xs font-bold flex items-center gap-1">
              <Star size={12} className="text-amber-400" fill="currentColor" />
              <span>{barber.rating}</span>
              <span className="text-white/40">({barber.reviewCount} reviews)</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] block mb-1">MASTER BARBER</span>
              <h1 className="font-anton text-4xl lg:text-5xl uppercase tracking-tight">{barber.firstName} {barber.lastName}</h1>
              <p className="text-sm text-[#F4845F] font-medium mt-1">{barber.specialty}</p>
            </div>
          </div>

          {/* Barber Bio & Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-anton tracking-widest uppercase">
                  ACTIVE & ACCEPTING APPOINTMENTS
                </span>
                <span className="text-xs text-white/40 font-mono">ID: #{barber.id.toUpperCase()}</span>
              </div>

              <h2 className="font-anton text-3xl text-white uppercase mb-4">BIOGRAPHY</h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                {barber.bio}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-[#181818] border border-white/10 mb-8">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Location</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-[#6BBF7A]" />
                    {barber.location}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Experience</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1 mt-1">
                    <Clock size={12} className="text-[#E882B4]" />
                    {barber.experience} Years
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Starting Price</span>
                  <span className="text-xs font-bold text-white mt-1 block">₹{barber.startingPrice}</span>
                </div>
              </div>

              {/* Service Selection */}
              <h3 className="font-anton text-2xl text-white uppercase mb-3">SELECT SERVICE</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-4 border text-left transition-all flex items-center justify-between ${
                      selectedServiceId === s.id
                        ? 'bg-white text-black border-white'
                        : 'bg-[#181818] text-white border-white/10 hover:border-white/30'
                    }`}
                    data-hover
                  >
                    <div>
                      <h4 className="font-anton text-base uppercase">{s.name}</h4>
                      <span className={`text-xs ${selectedServiceId === s.id ? 'text-black/70' : 'text-white/50'}`}>{s.duration}</span>
                    </div>
                    <span className="font-anton text-base">₹{s.price}</span>
                  </button>
                ))}
              </div>

              {/* Visual Time Slot Selector */}
              <h3 className="font-anton text-2xl text-white uppercase mb-3">AVAILABLE TIME SLOTS</h3>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`px-4 py-2.5 text-xs font-anton tracking-wider uppercase transition-all border ${
                      selectedTimeSlot === slot
                        ? 'bg-[#F4845F] text-black border-[#F4845F] scale-105 shadow-lg'
                        : 'bg-[#181818] text-white/70 border-white/10 hover:text-white hover:border-white/30'
                    }`}
                    data-hover
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Proceed Action Bar */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">Total Service Fee</span>
                <span className="font-anton text-3xl text-white">₹{service.price}</span>
              </div>

              <button
                onClick={handleProceedToBooking}
                className="px-8 py-4 bg-white text-black font-anton text-base tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center gap-3 shadow-xl"
                data-hover
              >
                <Scissors size={18} />
                <span>CONFIRM & BOOK TIME</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
