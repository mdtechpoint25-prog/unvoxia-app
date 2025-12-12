import HeroSection from '@/components/HeroSection';
import FeaturesBlocks from '@/components/FeaturesBlocks';
import FeedPreview from '@/components/FeedPreview';
import TestimonialCards from '@/components/TestimonialCards';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesBlocks />
      <FeedPreview />
      <TestimonialCards />
      <CTASection />
    </main>
  );
}