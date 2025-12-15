// Test database connection
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n1. Testing auth service...');
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Session error:', sessionError);
    } else {
      console.log('✓ Auth service is accessible');
    }

    console.log('\n2. Testing database connection...');
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (error) {
      console.error('Database error:', error.message);
      console.log('Note: This might be normal if the users table doesn\'t exist or has RLS policies');
    } else {
      console.log('✓ Database is accessible');
    }

    console.log('\n3. Testing health check...');
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    console.log('Health check status:', response.status);
    if (response.ok) {
      console.log('✓ REST API is accessible');
    } else {
      console.error('Health check failed:', response.statusText);
    }

  } catch (err) {
    console.error('Connection test failed:', err);
  }
}

testConnection();
