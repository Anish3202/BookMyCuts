import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import BarbersPage from './pages/BarbersPage';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';

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
          <Route path="/book" element={<BookingPage />} />
          <Route path="/bookings" element={<MyBookings />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
