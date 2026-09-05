export type ServiceCategory = 'haircut' | 'beard' | 'styling' | 'spa' | 'kids';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: ServiceCategory;
  popular?: boolean;
}

export interface Cut {
  id: string;
  name: string;
  category: string; // e.g. "LOW FADE", "MID FADE", "HIGH FADE", "TAPER", "TEXTURED CROP", "SLICK BACK", "BUZZ CUT", "FRENCH CROP"
  tagline: string;
  description: string;
  maintenance: 'LOW' | 'MEDIUM' | 'HIGH';
  faceShape: string;
  image: string;
  colorTheme: string; // hex color for hero/card accent
  popular?: boolean;
}

export interface Barber {
  id: string;
  firstName: string;
  lastName: string;
  salonName?: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string; // address
  city: string; // e.g. "Ahmedabad", "Mumbai", "Delhi"
  available: boolean;
  startingPrice: number;
  image: string;
  bio: string;
  services: Service[];
  availabilitySlots: string[]; // e.g. ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"]
  reviews?: Review[];
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  barberLocation: string;
  date: string;
  time: string;
  price: number;
  customerName: string;
  customerPhone: string;
  status: 'upcoming' | 'past' | 'cancelled';
  bookingCode: string;
  createdAt: string;
}

export interface StyleQuizState {
  length: 'SHORT' | 'MEDIUM' | 'LONG' | '';
  style: 'CLEAN' | 'CLASSIC' | 'MODERN' | 'BOLD' | '';
  maintenance: 'LOW' | 'MEDIUM' | 'HIGH' | '';
  occasion: 'EVERYDAY' | 'OFFICE' | 'DATE' | 'EVENT' | '';
  matchedCut?: Cut | null;
}
