import { Link } from 'react-router-dom';
import { Scissors, ArrowUpRight, MapPin, Share2, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-24 pb-12 relative overflow-hidden select-none">
      
      {/* Giant Anton Watermark Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden opacity-[0.03] w-full text-center">
        <span className="font-anton text-[22vw] leading-none text-white whitespace-nowrap uppercase block">
          BOOKMYCUTS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Editorial Callout */}
        <div className="grid lg:grid-cols-12 gap-12 pb-20 border-b border-white/10 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[0.35em] text-[#F4845F] uppercase block mb-3">
              YOUR TIME IS NOW
            </span>
            <h2 className="font-anton text-5xl md:text-7xl tracking-tight uppercase leading-[0.9]">
              READY FOR YOUR NEXT SIGNATURE CUT?
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link to="/book" data-hover>
              <button className="px-8 py-5 bg-white text-black font-anton text-lg tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 shadow-xl">
                <Scissors size={20} />
                <span>BOOK A CUT NOW</span>
              </button>
            </Link>

            <Link to="/barbers" data-hover>
              <button className="px-8 py-5 bg-white/5 border border-white/20 text-white font-anton text-base tracking-wider uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <span>FIND BARBERS</span>
                <ArrowUpRight size={18} />
              </button>
            </Link>
          </div>
        </div>

        {/* Navigation & Brand Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white rounded-sm flex items-center justify-center">
                <Scissors size={18} className="text-black" strokeWidth={2.5} />
              </div>
              <span className="font-anton text-2xl tracking-wider text-white uppercase">
                BOOKMYCUTS
              </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              The ultimate high-fashion haircut discovery and barber booking platform. Engineered for precision, style, and effortless scheduling.
            </p>

            <div className="flex items-center gap-3 text-xs text-white/60">
              <MapPin size={14} className="text-[#6BBF7A]" />
              <span>Available in Ahmedabad • Mumbai • Delhi</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-anton text-sm tracking-widest text-white/40 uppercase mb-6">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {[['/', 'Home Showcase'], ['/services', 'Service Menu'], ['/barbers', 'Master Barbers'], ['/book', 'Instant Booking']].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-white/60 hover:text-white transition-colors" data-hover>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Account */}
          <div>
            <h4 className="font-anton text-sm tracking-widest text-white/40 uppercase mb-6">
              ACCOUNT
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {[['/bookings', 'My Digital Passes'], ['/saved', 'Saved Haircuts'], ['/book', 'Reschedule Cut']].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-white/60 hover:text-white transition-colors" data-hover>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-anton text-sm tracking-widest text-white/40 uppercase mb-6">
              STAY SHARP
            </h4>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              Get secret drops, lookbooks, and barber availability alerts directly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="bg-white/5 border border-white/20 border-r-0 px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white w-full"
              />
              <button className="bg-white text-black font-anton px-4 text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors">
                JOIN
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div>
            © 2026 BOOKMYCUTS INC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/60">
              <Globe size={14} />
              <span>INSTAGRAM @BOOKMYCUTS</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/60">
              <Share2 size={14} />
              <span>TWITTER @BOOKMYCUTS</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/60">
              <Sparkles size={14} />
              <span>YOUTUBE @BOOKMYCUTS</span>
            </span>
          </div>

          <div>
            DESIGNED FOR THE MODERN GENTLEMAN
          </div>
        </div>

      </div>
    </footer>
  );
}
