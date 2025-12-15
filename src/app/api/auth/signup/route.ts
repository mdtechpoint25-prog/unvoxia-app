import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Add CORS headers to response
function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || '*';
  return NextResponse.json({}, { 
    headers: corsHeaders(origin)
  });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin') || '*';
  
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500, headers: corsHeaders(origin) }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // Create admin client to bypass CORS
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Get the app URL from environment or request origin
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nomaworld.co.ke';

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        created_via: 'signup_api'
      }
    });

    if (error) {
      console.error('Signup error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // Send confirmation email
    if (data.user) {
      const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${origin}/auth/confirm`
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email for confirmation.',
      user: {
        id: data.user?.id,
        email: data.user?.email
      }
    }, { headers: corsHeaders(origin) });
  } catch (error: any) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
