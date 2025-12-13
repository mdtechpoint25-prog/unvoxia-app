import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NOMA – Speak Without Fear | Anonymous Emotional Support',
  description: 'NOMA is a safe, anonymous space to share feelings, release pain, and find emotional support without judgment. Healing circles for love, mental health, trauma & more.',
  metadataBase: new URL('https://nomaworld.co.ke'),
  keywords: ['anonymous mental health support', 'share feelings anonymously', 'safe space to express emotions', 'anonymous emotional support', 'speak without fear', 'anonymous community for healing', 'mental health safe space', 'depression support anonymous', 'anxiety help without judgement', 'trauma anonymous sharing', 'emotional support Kenya'],
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
    title: 'NOMA – Speak Without Fear | Anonymous Emotional Support',
    description: 'A safe, anonymous space to share feelings and find emotional support without judgment. You are not alone.',
    siteName: 'NOMA',
    type: 'website',
    images: [{ url: '/images/og-image.svg', width: 1200, height: 400 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOMA – Speak Without Fear',
    description: 'Anonymous emotional support and healing circles. Share your feelings without fear or judgment.',
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
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NOMA',
              alternateName: 'No Mask World',
              url: 'https://nomaworld.co.ke',
              description: 'NOMA is a safe, anonymous space to share feelings, release pain, and find emotional support without judgment.',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'support@mail.nomaworld.co.ke',
              },
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'NOMA',
              url: 'https://nomaworld.co.ke',
              description: 'Anonymous emotional support platform for healing and connection',
            })
          }}
        />      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
