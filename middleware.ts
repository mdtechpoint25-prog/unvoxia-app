import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const url = new URL(request.url);
  
  // Redirect root to /experiences as the primary landing page
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/experiences', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match only the root path
    '/'
  ]
};
