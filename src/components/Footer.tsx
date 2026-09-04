import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                <Scissors size={14} className="text-black" strokeWidth={2} />
              </div>
              <span className="text-white font-bold text-base tracking-tight">BookMyCuts</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Your next great cut, booked. Discover trusted barbers, explore styles, and book in just a few taps.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-white/30 uppercase mb-4">Platform</div>
            <div className="flex flex-col gap-3">
              {[['/', 'Home'], ['/services', 'Services'], ['/barbers', 'Barbers'], ['/book', 'Book a Cut']].map(([href, label]) => (
                <Link key={href} to={href} className="text-white/50 text-sm hover:text-white transition-colors" data-hover>{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-white/30 uppercase mb-4">Account</div>
            <div className="flex flex-col gap-3">
              {[['/bookings', 'My Bookings'], ['/book', 'New Booking']].map(([href, label]) => (
                <Link key={href} to={href} className="text-white/50 text-sm hover:text-white transition-colors" data-hover>{label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© 2026 BookMyCuts. All rights reserved.</p>
          <p className="text-white/20 text-xs tracking-widest">PREMIUM GROOMING PLATFORM</p>
        </div>
      </div>
    </footer>
  );
}
