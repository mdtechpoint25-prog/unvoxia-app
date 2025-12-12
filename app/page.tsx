import HeroSection from '@/components/HeroSection';
import FeedPreview from '@/components/FeedPreview';
import FeaturesBlocks from '@/components/FeaturesBlocks';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCards from '@/components/TestimonialCards';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <main style={{ paddingTop: 0 }}>
      <HeroSection />
      <FeedPreview />
      <FeaturesBlocks />
      <HowItWorks />
      <TestimonialCards />
      <CTASection />
    </main>
  );
}