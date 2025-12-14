import '../globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'NOMA – A World With No Masks',
  description: 'A social platform where people exist authentically. Feel understood before you participate.',
  metadataBase: new URL('https://nomaworld.co.ke'),
  keywords: ['authentic expression', 'no masks', 'real connection', 'emotional safety', 'anonymous sharing'],
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
    title: 'NOMA – A World With No Masks',
    description: 'Feel understood before you participate. Express yourself authentically.',
    siteName: 'NOMA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOMA – A World With No Masks',
    description: 'A social platform where people exist authentically.',
  }
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function ArrivalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
