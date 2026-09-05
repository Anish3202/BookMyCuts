import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_CUTS } from '../data/cuts';
import { barbers } from '../data/barbers';
import { Bookmark, Scissors, Star, Trash2 } from 'lucide-react';

export default function SavedPage() {
  const [savedCuts, setSavedCuts] = useState(GALLERY_CUTS.slice(0, 3));
  const [savedBarbers, setSavedBarbers] = useState(barbers.slice(0, 2));

  const removeCut = (id: string) => {
    setSavedCuts(prev => prev.filter(c => c.id !== id));
  };

  const removeBarber = (id: string) => {
    setSavedBarbers(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-36 pb-24 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-14 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <Bookmark size={18} className="text-[#E882B4]" />
            <span className="text-xs font-bold tracking-[0.35em] text-[#E882B4] uppercase">
              PERSONAL CURATION
            </span>
          </div>
          <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-tight">
            SAVED LOOKS & BARBERS
          </h1>
          <p className="text-white/50 text-base mt-2">
            Your saved haircut inspirations and favorite master barbers for quick booking.
          </p>
        </div>

        {/* Section 1: Saved Haircuts */}
        <div className="mb-16">
          <h2 className="font-anton text-3xl uppercase tracking-wide mb-6 flex items-center justify-between">
            <span>SAVED HAIRCUTS ({savedCuts.length})</span>
          </h2>

          {savedCuts.length === 0 ? (
            <div className="bg-[#121212] border border-white/10 p-12 text-center">
              <p className="text-white/40 text-sm">No saved haircuts yet.</p>
              <Link to="/#cuts-gallery" className="inline-block mt-4 text-xs font-anton text-white underline tracking-widest uppercase">
                EXPLORE GALLERY
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {savedCuts.map(cut => (
                <div key={cut.id} className="bg-[#121212] border border-white/10 overflow-hidden group relative">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src={cut.image} alt={cut.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <button
                      onClick={() => removeCut(cut.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-red-400 transition-colors"
                      data-hover
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest block">{cut.category}</span>
                      <h3 className="font-anton text-2xl text-white uppercase">{cut.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-white/10">
                    <span className="text-xs text-white/50">{cut.maintenance} MAINT</span>
                    <Link to={`/book?cut=${cut.id}`} data-hover>
                      <button className="px-4 py-2 bg-white text-black font-anton text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5">
                        <Scissors size={12} />
                        <span>BOOK</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Saved Barbers */}
        <div>
          <h2 className="font-anton text-3xl uppercase tracking-wide mb-6">
            FAVORITE BARBERS ({savedBarbers.length})
          </h2>

          {savedBarbers.length === 0 ? (
            <div className="bg-[#121212] border border-white/10 p-12 text-center">
              <p className="text-white/40 text-sm">No favorite barbers saved.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {savedBarbers.map(barber => (
                <div key={barber.id} className="bg-[#121212] border border-white/10 p-6 flex items-center gap-6 relative">
                  <img src={barber.image} alt={barber.firstName} className="w-24 h-24 object-cover border border-white/15" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-anton text-2xl text-white uppercase">{barber.firstName} {barber.lastName}</h3>
                      <button onClick={() => removeBarber(barber.id)} className="text-white/40 hover:text-red-400" data-hover>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-[#F4845F] font-bold mb-2">{barber.specialty}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1 text-amber-400 font-bold"><Star size={12} fill="currentColor" /> {barber.rating}</span>
                      <span>{barber.location}</span>
                    </div>
                    <div className="mt-4">
                      <Link to={`/barbers/${barber.id}`} data-hover>
                        <button className="px-4 py-2 bg-white/10 text-white font-anton text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                          VIEW PROFILE & BOOK
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
