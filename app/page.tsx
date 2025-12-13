import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturesBlocks from '@/components/FeaturesBlocks';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCards from '@/components/TestimonialCards';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'NOMA – Speak Without Fear, Heal Without Judgement | Anonymous Emotional Support',
  description: 'A safe, anonymous healing platform where you can freely express your true feelings, receive emotional support, and find healing. No names, no judgement, just compassion.',
  openGraph: {
    title: 'NOMA – Anonymous Healing Platform',
    description: 'Share your feelings anonymously, receive compassionate support, and begin your healing journey in a safe community.',
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesBlocks />
      <HowItWorks />
      <TestimonialCards />
      <CTASection />
    </main>
  );
}