import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'No Mask World (NOMA) - Real Work. Real Results.',
  description: 'A modern digital productivity platform that helps you work smarter, collaborate faster, and manage tasks effortlessly. Real Work. Real Results. No Mask.',
  metadataBase: new URL('https://nomaworld.co.ke'),
  keywords: ['productivity', 'collaboration', 'project management', 'messaging', 'NOMA', 'No Mask World'],
  openGraph: {
    title: 'No Mask World (NOMA)',
    description: 'Work smarter with NOMA - your clean, simple, and powerful productivity hub.',
    siteName: 'No Mask World',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
