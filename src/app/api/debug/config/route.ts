import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Only allow in development or with special header
  const isDev = process.env.NODE_ENV === 'development';
  const debugHeader = request.headers.get('x-debug-token');
  
  if (!isDev && debugHeader !== process.env.DEBUG_TOKEN) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const config = {
    environment: process.env.NODE_ENV,
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
      projectId: process.env.SUPABASE_PROJECT_ID ? 'SET' : 'MISSING',
    },
    app: {
      url: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
    },
    smtp: {
      host: process.env.SMTP_HOST ? 'SET' : 'MISSING',
      port: process.env.SMTP_PORT ? 'SET' : 'MISSING',
      emailInfo: process.env.SMTP_EMAIL_INFO ? 'SET' : 'MISSING',
    },
    turso: {
      url: process.env.TURSO_DATABASE_URL ? 'SET' : 'MISSING',
      token: process.env.TURSO_AUTH_TOKEN ? 'SET' : 'MISSING',
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
    }
  };

  return NextResponse.json(config);
}
