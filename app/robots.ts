import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/login',
          '/signup',
          '/reset-password',
          '/forgot-password',
        ],
      },
    ],
    sitemap: 'https://nomaworld.co.ke/sitemap.xml',
  };
}
