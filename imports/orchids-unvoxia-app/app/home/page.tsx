import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturesBlocks from '@/components/FeaturesBlocks';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCards from '@/components/TestimonialCards';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'NOMA Home – About Our Healing Platform | Anonymous Emotional Support',
  description: 'Learn about NOMA, a safe anonymous healing platform where you can freely express your true feelings, receive emotional support, and find healing.',
  openGraph: {
    title: 'NOMA – About Our Anonymous Healing Platform',
    description: 'Learn about NOMA\'s mission: safe, anonymous emotional healing for everyone.',
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
      <FAQSection />
      <CTASection />
    </main>
  );
}