#!/bin/bash

echo "🔍 Testing Supabase Connection..."
echo ""

# Test Supabase URL
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)
echo "Supabase URL: $SUPABASE_URL"

# Test if Supabase is reachable
echo ""
echo "Testing Supabase API endpoint..."
curl -s "$SUPABASE_URL/auth/v1/health" | jq . || echo "Health check failed"

echo ""
echo "Testing Supabase signup endpoint directly..."
ANON_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local | cut -d '=' -f2)

curl -s -X POST "$SUPABASE_URL/auth/v1/signup" \
  -H "apikey: $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"directtest@example.com\",\"password\":\"test123456\"}" | head -50

echo ""
echo "✅ Supabase connection test complete"
