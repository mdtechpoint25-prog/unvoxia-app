import { NextResponse } from 'next/server';
import { isDatabaseConfigured } from '@/lib/turso';
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
      status: 'ok' | 'error' | 'not_configured';
      latency?: number;
      error?: string;
    };
    environment: {
      status: 'ok' | 'warning';
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
      database: { status: 'not_configured' },
      environment: { status: 'ok' }
    }
  };

  // Check database configuration
  if (isDatabaseConfigured()) {
    const dbStart = Date.now();
    try {
      // Import db dynamically to avoid errors when not configured
      const { db } = await import('@/lib/turso');
      await db.execute({ sql: 'SELECT 1', args: [] });
      health.checks.database = {
        status: 'ok',
        latency: Date.now() - dbStart
      };
    } catch (err: any) {
      health.checks.database = {
        status: 'error',
        latency: Date.now() - dbStart,
        error: err.message
      };
    }
  } else {
    health.checks.database = {
      status: 'not_configured',
      error: 'TURSO_DATABASE_URL not set'
    };
  }

  // Check optional environment variables
  const optionalEnvVars = [
    'SMTP_HOST',
    'SMTP_USER'
  ];
  
  const missingEnvVars = optionalEnvVars.filter(v => !process.env[v]);
  health.checks.environment = {
    status: missingEnvVars.length === 0 ? 'ok' : 'warning',
    missing: missingEnvVars.length > 0 ? missingEnvVars : undefined
  };

  // Overall status - ok if database is ok or not_configured (platform works without it)
  const dbOk = health.checks.database.status === 'ok' || health.checks.database.status === 'not_configured';
  health.status = dbOk ? 'ok' : 'degraded';

  return NextResponse.json(health, {
    status: health.status === 'ok' ? 200 : 503
  });
}
