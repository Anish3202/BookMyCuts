import type { Barber } from '../types';
import { services } from './services';

export const barbers: Barber[] = [
  {
    id: 'b1',
    firstName: 'Arjun',
    lastName: 'Mehta',
    salonName: 'Urban Cuts Studio',
    specialty: 'Skin Fades & Modern Crops',
    experience: 8,
    rating: 4.9,
    reviewCount: 312,
    location: 'C.G. Road, Navrangpura',
    city: 'Ahmedabad',
    available: true,
    startingPrice: 350,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
    bio: 'Arjun brings surgical precision to contemporary skin fades and texture crops. Having trained with master barbers in London and Mumbai, his chairs stay in high demand.',
    services: services.filter(s => ['s1', 's2', 's3', 's4'].includes(s.id)),
    availabilitySlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '05:30 PM', '06:30 PM'],
    reviews: [
      { id: 'r1', authorName: 'Rohan Sharma', rating: 5, comment: 'Best low fade in Ahmedabad! Arjun knows exactly how to contour hair to my head shape.', date: '2 days ago' },
      { id: 'r2', authorName: 'Kabir Verma', rating: 5, comment: 'Super crisp lines and great attention to beard trimming.', date: '1 week ago' }
    ]
  },
  {
    id: 'b2',
    firstName: 'Rahul',
    lastName: 'Sharma',
    salonName: 'Blade & Co.',
    specialty: 'Beard Artistry & Classic Comedic Cuts',
    experience: 6,
    rating: 4.8,
    reviewCount: 228,
    location: 'Bandrapolis West',
    city: 'Mumbai',
    available: true,
    startingPrice: 300,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop',
    bio: 'Rahul is a beard sculptor with a deep love for traditional razor work and pompadours. Known for his hot towel treatments and signature beard oil finishes.',
    services: services.filter(s => ['s1', 's3', 's4', 's6'].includes(s.id)),
    availabilitySlots: ['09:30 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'],
    reviews: [
      { id: 'r3', authorName: 'Vikram Joshi', rating: 5, comment: 'Hands down the best beard sculpting experience in Mumbai.', date: '3 days ago' }
    ]
  },
  {
    id: 'b3',
    firstName: 'Dev',
    lastName: 'Patel',
    salonName: 'The Cut Syndicate',
    specialty: 'Hair Styling & French Crops',
    experience: 5,
    rating: 4.7,
    reviewCount: 184,
    location: 'Bodakdev, S.G. Highway',
    city: 'Ahmedabad',
    available: true,
    startingPrice: 350,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    bio: 'Dev excels in texture-forward haircuts and modern street style crops. He stays at the cutting edge of fashion week styling trends.',
    services: services.filter(s => ['s1', 's2', 's6', 's8'].includes(s.id)),
    availabilitySlots: ['11:00 AM', '12:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'],
    reviews: [
      { id: 'r4', authorName: 'Aman Shah', rating: 5, comment: 'Super stylish space and Dev gave me the exact crop I asked for.', date: '5 days ago' }
    ]
  },
  {
    id: 'b4',
    firstName: 'Karan',
    lastName: 'Verma',
    salonName: 'Apex Grooming Lounge',
    specialty: 'Scalp Treatments & Luxury Spa',
    experience: 10,
    rating: 4.9,
    reviewCount: 407,
    location: 'Connaught Place',
    city: 'Delhi',
    available: true,
    startingPrice: 400,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    bio: 'With over a decade of luxury grooming experience, Karan offers holistic scalp treatments and refined classic cuts for discerning gentlemen.',
    services: services.filter(s => ['s1', 's4', 's5', 's8'].includes(s.id)),
    availabilitySlots: ['10:30 AM', '01:30 PM', '04:00 PM', '05:30 PM'],
    reviews: [
      { id: 'r5', authorName: 'Siddharth Rao', rating: 5, comment: 'Unmatched scalp massage and precision haircut. Worth every rupee.', date: 'Yesterday' }
    ]
  }
];

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM'
];
