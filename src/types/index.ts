export type ServiceCategory = 'haircut' | 'beard' | 'styling' | 'spa' | 'kids';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: ServiceCategory;
  popular?: boolean;
}

export interface Barber {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  available: boolean;
  startingPrice: number;
  image: string;
  bio: string;
  services: string[];
}

export interface BookingState {
  service: Service | null;
  barber: Barber | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
}
