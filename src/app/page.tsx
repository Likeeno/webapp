import SupportBox from '@/components/SupportBox';
import { Header, Hero, Footer, FAQ, Testimonials } from '../components';
import WhyLikeeno from '@/components/WhyLikeeno';

export default function Home() {
  return (
    <div key="main-container" className="bg-primary-background min-h-screen">
      <Header />
      <Hero />
      <SupportBox />
      <WhyLikeeno />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
