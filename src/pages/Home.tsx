import Hero from '../components/Hero';
import EditorialBanner from '../components/EditorialBanner';
import CutGallery from '../components/CutGallery';
import StyleQuiz from '../components/StyleQuiz';
import BarbersPreview from '../components/BarbersPreview';
import WhyBookMyCuts from '../components/WhyBookMyCuts';

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <Hero />
      <EditorialBanner />
      <CutGallery />
      <StyleQuiz />
      <BarbersPreview />
      <WhyBookMyCuts />
    </main>
  );
}
