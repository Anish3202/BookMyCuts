import type { Cut } from '../types';

export const HERO_SLIDES: (Cut & { heroTitle: string; heroSubtitle: string; modelMain: string; modelSide1: string; modelSide2: string })[] = [
  {
    id: 'fade',
    name: 'THE FADE',
    category: 'MID FADE',
    tagline: 'SHARP. CLEAN. ALWAYS WORKS.',
    description: 'Precision skin fade transition with a seamless gradient contour. Engineered for modern presence.',
    maintenance: 'MEDIUM',
    faceShape: 'Oval & Square',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop',
    colorTheme: '#F4845F', // Coral / Warm Terracotta
    heroTitle: 'FADE',
    heroSubtitle: 'Sharp. Clean. Always works.',
    modelMain: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop',
    modelSide1: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
    modelSide2: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'texture',
    name: 'TEXTURED CROP',
    category: 'TEXTURED CROP',
    tagline: 'EFFORTLESS TEXTURE. MODERN FINISH.',
    description: 'Choppy crown layers paired with tight tapered sides. Designed for casual, confident movement.',
    maintenance: 'LOW',
    faceShape: 'Round & Heart',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
    colorTheme: '#6BBF7A', // Fresh Green
    heroTitle: 'TEXTURE',
    heroSubtitle: 'Effortless texture. Modern finish.',
    modelMain: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
    modelSide1: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop',
    modelSide2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'slick',
    name: 'SLICK BACK',
    category: 'SLICK BACK',
    tagline: 'CLEAN LINES. STRONG PRESENCE.',
    description: 'High-shine swept back crown with razor-sharp temple line-up. A statement of authority.',
    maintenance: 'HIGH',
    faceShape: 'Square & Diamond',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
    colorTheme: '#E882B4', // Electric Pink
    heroTitle: 'SLICK',
    heroSubtitle: 'Clean lines. Strong presence.',
    modelMain: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
    modelSide1: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    modelSide2: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'classic',
    name: 'THE CLASSIC',
    category: 'CLASSIC CROP',
    tagline: 'TIMELESS NEVER GOES OUT OF STYLE.',
    description: 'Traditional side-part pompadour polished with natural matte cream. Elegant and versatile.',
    maintenance: 'LOW',
    faceShape: 'All Face Shapes',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    colorTheme: '#6EB5FF', // Sky Blue
    heroTitle: 'CLASSIC',
    heroSubtitle: 'Timeless never goes out of style.',
    modelMain: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    modelSide1: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    modelSide2: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop'
  }
];

export const GALLERY_CUTS: Cut[] = [
  {
    id: 'low-fade',
    name: 'LOW FADE',
    category: 'LOW FADE',
    tagline: 'Subtle taper contouring near the ear line.',
    description: 'Low-profile skin fade starting just above the ears for a clean, natural outline.',
    maintenance: 'LOW',
    faceShape: 'Oval, Round',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#F4845F',
    popular: true
  },
  {
    id: 'mid-fade',
    name: 'MID FADE',
    category: 'MID FADE',
    tagline: 'Balanced gradient midway up the head.',
    description: 'The universal benchmark cut. Sharp contrast starting at temple height.',
    maintenance: 'MEDIUM',
    faceShape: 'All Shapes',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#6BBF7A',
    popular: true
  },
  {
    id: 'high-fade',
    name: 'HIGH FADE',
    category: 'HIGH FADE',
    tagline: 'Aggressive skin drop starting high near crown.',
    description: 'Bold statement cut with high skin blend emphasizing top volume.',
    maintenance: 'MEDIUM',
    faceShape: 'Square, Oval',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#E882B4'
  },
  {
    id: 'taper-fade',
    name: 'TAPER FADE',
    category: 'TAPER',
    tagline: 'Clean neckline and sideburn drop.',
    description: 'Keeps natural weight around sides while tapering only the temple & nape.',
    maintenance: 'LOW',
    faceShape: 'Round, Heart',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#6EB5FF',
    popular: true
  },
  {
    id: 'textured-crop',
    name: 'TEXTURED CROP',
    category: 'TEXTURED CROP',
    tagline: 'Fringe forward with heavy piecey texture.',
    description: 'Modern European crop cut with forward fringe motion and textured crown top.',
    maintenance: 'LOW',
    faceShape: 'Oval, Diamond',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#6BBF7A',
    popular: true
  },
  {
    id: 'slick-back',
    name: 'SLICK BACK',
    category: 'SLICK BACK',
    tagline: 'Retro volume swept smoothly back.',
    description: 'Timeless executive pompadour combed back with medium shine pomade.',
    maintenance: 'HIGH',
    faceShape: 'Square, Rectangular',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#E882B4'
  },
  {
    id: 'buzz-cut',
    name: 'BUZZ CUT',
    category: 'BUZZ CUT',
    tagline: 'Minimalist military precision lineup.',
    description: 'Ultra-low maintenance uniform clipper cut paired with crisp razor edge-up.',
    maintenance: 'LOW',
    faceShape: 'Chiseled Jawline',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#F4845F'
  },
  {
    id: 'french-crop',
    name: 'FRENCH CROP',
    category: 'FRENCH CROP',
    tagline: 'Blunt cut fringe with tight perimeter.',
    description: 'Clean horizontal fringe line with skin taper along sides and back.',
    maintenance: 'LOW',
    faceShape: 'Oval, Long',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=800&auto=format&fit=crop',
    colorTheme: '#6EB5FF'
  }
];
