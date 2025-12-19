import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Test Supabase connection
    const { data: authCheck, error: authError } = await supabase.auth.getSession();
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        supabase: {
          connected: !authError,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
          auth: authError ? 'error' : 'operational'
        }
      },
      environment: process.env.NODE_ENV,
      version: '1.0.0'
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
