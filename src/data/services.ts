import type { Service } from '../types';

export const services: Service[] = [
  { id: 's1', name: 'Classic Haircut', description: 'A timeless cut tailored to your face shape and style preference. Includes wash and blow-dry.', duration: 45, price: 350, category: 'haircut', popular: true },
  { id: 's2', name: 'Skin Fade', description: 'Ultra-clean fade from skin to your desired length. A modern classic redefined.', duration: 40, price: 400, category: 'haircut', popular: true },
  { id: 's3', name: 'Beard Trim & Shape', description: 'Precision trimming and shaping of your beard to accentuate your jawline and style.', duration: 30, price: 200, category: 'beard' },
  { id: 's4', name: 'Haircut + Beard', description: 'The complete grooming experience. A full haircut paired with expert beard trimming and shaping.', duration: 70, price: 550, category: 'haircut', popular: true },
  { id: 's5', name: 'Scalp Treatment', description: 'Deep cleansing and nourishing scalp treatment to promote healthy hair growth and reduce dandruff.', duration: 60, price: 600, category: 'spa' },
  { id: 's6', name: 'Hair Styling', description: 'Expert styling using premium products for any occasion — casual to formal.', duration: 30, price: 250, category: 'styling' },
  { id: 's7', name: 'Kids Haircut', description: 'Gentle, fun, and precise cuts for kids under 12. Patient stylists make it a great experience.', duration: 30, price: 200, category: 'kids' },
  { id: 's8', name: 'Hair Spa', description: 'A complete hair spa experience — deep conditioning, steam treatment, and scalp massage.', duration: 90, price: 800, category: 'spa' },
];
