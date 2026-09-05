import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import BarbersPage from './pages/BarbersPage';
import BarberDetailPage from './pages/BarberDetailPage';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import SavedPage from './pages/SavedPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/barbers" element={<BarbersPage />} />
          <Route path="/barbers/:id" element={<BarberDetailPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
