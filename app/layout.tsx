import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'No Mask World (NOMA) - Real Work. Real Results.',
  description: 'A modern digital productivity platform that helps you work smarter, collaborate faster, and manage tasks effortlessly. Real Work. Real Results. No Mask.',
  metadataBase: new URL('https://nomaworld.co.ke'),
  keywords: ['productivity', 'collaboration', 'project management', 'messaging', 'NOMA', 'No Mask World'],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.svg',
    shortcut: '/favicon.svg'
  },
  openGraph: {
    title: 'No Mask World (NOMA)',
    description: 'Work smarter with NOMA - your clean, simple, and powerful productivity hub.',
    siteName: 'No Mask World',
    type: 'website',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 400 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No Mask World (NOMA)',
    description: 'A modern digital productivity platform - Real Work. Real Results.',
    images: ['/images/og-image.svg']
  }
};

export const viewport: Viewport = {
  themeColor: '#1ABC9C',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
