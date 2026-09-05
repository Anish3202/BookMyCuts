import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Scissors } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Cuts', path: '/cuts' },
    { name: 'Barbers', path: '/barbers' },
    { name: 'Services', path: '/services' },
    { name: 'My Bookings', path: '/bookings' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold transition-transform group-hover:scale-105">
              <Scissors className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-anton text-2xl tracking-wider text-white uppercase leading-none">
                BOOKMYCUTS
              </span>
              <span className="text-[9px] font-bold text-[#F4845F] tracking-widest uppercase mt-0.5">
                BOOK THE LOOK.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors relative py-1 ${
                    isActive ? 'text-white font-extrabold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4845F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Search cuts, barbers, locations..."
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/saved"
              className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:flex"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
            </Link>

            <Link
              to="/book"
              className="px-5 py-2.5 rounded-full font-anton text-xs uppercase tracking-widest bg-white hover:bg-[#F4845F] text-black hover:text-white transition-all shadow-lg hover:scale-105"
            >
              BOOK NOW
            </Link>
          </div>

        </div>
      </nav>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}