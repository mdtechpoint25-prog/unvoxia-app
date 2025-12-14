import '../globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'NOMA – A World With No Masks',
  description: 'A text-based social platform where people exist authentically. Anonymous, safe, real.',
  metadataBase: new URL('https://nomaworld.co.ke'),
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0f172a', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
