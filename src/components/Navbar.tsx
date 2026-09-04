import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scissors } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Barbers', href: '/barbers' },
  { label: 'My Bookings', href: '/bookings' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" data-hover>
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center group-hover:bg-white/90 transition-colors">
              <Scissors size={16} className="text-black" strokeWidth={2} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">BookMyCuts</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                data-hover
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === l.href ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/book" data-hover>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black text-sm font-bold px-5 py-2.5 tracking-widest hover:bg-white/90 transition-colors"
              >
                BOOK A CUT
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            data-hover
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[#080808] flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-3xl font-bold text-white/80 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/book">
                <button className="mt-4 bg-white text-black font-bold text-sm px-6 py-4 w-full tracking-widest">
                  BOOK A CUT
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
