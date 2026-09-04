import Hero from '../components/Hero';
import BookingSearch from '../components/BookingSearch';
import ServicesPreview from '../components/ServicesPreview';
import BarbersPreview from '../components/BarbersPreview';
import WhyBookMyCuts from '../components/WhyBookMyCuts';

export default function Home() {
  return (
    <main>
      <Hero />
      <BookingSearch />
      <ServicesPreview />
      <BarbersPreview />
      <WhyBookMyCuts />
    </main>
  );
}
