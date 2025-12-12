import HeroSection from '@/components/HeroSection';
import FeaturesBlocks from '@/components/FeaturesBlocks';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCards from '@/components/TestimonialCards';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <main style={{ paddingTop: 0 }}>
      <HeroSection />
      <FeaturesBlocks />
      <HowItWorks />
      <TestimonialCards />
      <CTASection />
    </main>
  );
}