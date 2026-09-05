import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { GALLERY_CUTS } from '../data/cuts';
import { barbers } from '../data/barbers';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const lower = query.toLowerCase().trim();

  const matchedCuts = query
    ? GALLERY_CUTS.filter(c => c.name.toLowerCase().includes(lower) || c.category.toLowerCase().includes(lower))
    : GALLERY_CUTS.slice(0, 4);

  const matchedBarbers = query
    ? barbers.filter(b => 
        `${b.firstName} ${b.lastName}`.toLowerCase().includes(lower) || 
        b.city.toLowerCase().includes(lower) || 
        b.specialty.toLowerCase().includes(lower)
      )
    : barbers.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-3xl bg-[#111111] border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#F4845F]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cuts (fade, crop), barbers, or locations (Ahmedabad, Mumbai)..."
              className="w-full bg-transparent text-lg font-bold text-white placeholder-neutral-500 focus:outline-none"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Suggestions & Quick Filters */}
        {!query && (
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="text-neutral-500 py-1 mr-2">Popular Searches:</span>
            {['Low Fade', 'Textured Crop', 'Ahmedabad', 'Mumbai', 'Skin Fade', 'Beard Trim'].map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#F4845F] transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
          
          {/* Matched Haircut Styles */}
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 block mb-3">
              HAIRCUT STYLES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedCuts.map(cut => (
                <div
                  key={cut.id}
                  onClick={() => {
                    navigate(`/cuts`);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#F4845F] flex items-center gap-3 cursor-pointer transition-all group"
                >
                  <img
                    src={cut.image}
                    alt={cut.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-anton text-base text-white group-hover:text-[#F4845F] transition-colors truncate">
                      {cut.name}
                    </h4>
                    <p className="text-xs text-neutral-400 truncate">{cut.tagline}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Matched Barbers */}
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 block mb-3">
              BARBERS & SALONS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedBarbers.map(barber => (
                <div
                  key={barber.id}
                  onClick={() => {
                    navigate(`/barbers/${barber.id}`);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#6BBF7A] flex items-center gap-3 cursor-pointer transition-all group"
                >
                  <img
                    src={barber.image}
                    alt={barber.firstName}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-anton text-base text-white group-hover:text-[#6BBF7A] transition-colors truncate">
                      {barber.firstName} {barber.lastName}
                    </h4>
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#6BBF7A]" />
                      {barber.city} • FROM ₹{barber.startingPrice}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
