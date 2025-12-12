import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SITE } from '@/lib/constants';

type HealthStatus = {
  status: 'ok' | 'degraded';
  timestamp: string;
  app: {
    name: string;
    shortName: string;
    domain: string;
  };
  checks: {
    database: {
      status: 'ok' | 'error' | 'unknown';
      latency: number;
      error?: string;
    };
    environment: {
      status: 'ok' | 'warning' | 'unknown';
      missing?: string[];
    };
  };
};

export async function GET() {
  const health: HealthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    app: {
      name: SITE.name,
      shortName: SITE.shortName,
      domain: SITE.domain
    },
    checks: {
      database: { status: 'unknown', latency: 0 },
      environment: { status: 'unknown' }
    }
  };

  // Check database connectivity
  const dbStart = Date.now();
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    health.checks.database = {
      status: error ? 'error' : 'ok',
      latency: Date.now() - dbStart,
      error: error?.message
    };
  } catch (err: any) {
    health.checks.database = {
      status: 'error',
      latency: Date.now() - dbStart,
      error: err.message
    };
  }

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
  health.checks.environment = {
    status: missingEnvVars.length === 0 ? 'ok' : 'warning',
    missing: missingEnvVars.length > 0 ? missingEnvVars : undefined
  };

  // Overall status
  const allChecksOk = Object.values(health.checks).every(
    (check: any) => check.status === 'ok'
  );
  health.status = allChecksOk ? 'ok' : 'degraded';

  return NextResponse.json(health, {
    status: health.status === 'ok' ? 200 : 503
  });
}
