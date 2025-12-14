import { redirect } from 'next/navigation';

export const metadata = {
  title: 'NOMA – A World With No Masks',
  description: 'A text-based social platform where people exist authentically. Anonymous, safe, real.',
  openGraph: {
    title: 'NOMA – A World With No Masks',
    description: 'Express yourself authentically. No masks, no pretending.',
  },
};

export default function HomePage() {
  redirect('/foryou');
}