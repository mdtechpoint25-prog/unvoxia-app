# Supabase CORS Configuration Fix

## Problem
The registration process was failing with a CORS error because the production domain `https://www.nomaworld.co.ke` was not whitelisted in your Supabase project settings.

## Changes Made

### 1. Updated Supabase Client Library
- Updated `@supabase/supabase-js` to the latest version (2.87.1+)
- This version includes better CORS handling and PKCE flow support

### 2. Enhanced Supabase Client Configuration (`src/lib/supabase.ts`)
Added proper auth configuration:
- `autoRefreshToken: true` - Automatically refreshes auth tokens
- `persistSession: true` - Persists auth session across page reloads
- `detectSessionInUrl: true` - Detects session from URL parameters
- `flowType: 'pkce'` - Uses PKCE flow for better security
- `storage: localStorage` - Uses browser localStorage for session storage

### 3. Updated Auth Context (`src/lib/auth-context.tsx`)
Added `emailRedirectTo` option in the signUp method to properly handle email confirmation redirects.

### 4. Updated Environment Variables (`.env.local`)
Changed `NEXT_PUBLIC_APP_URL` from `http://nomaworld.co.ke` to `https://www.nomaworld.co.ke`

## Required: Supabase Dashboard Configuration

⚠️ **IMPORTANT**: You MUST configure the following in your Supabase Dashboard:

### Step 1: Navigate to Authentication Settings
1. Go to https://supabase.com/dashboard/project/owoltswdqcgkatewucrq
2. Click on "Authentication" in the left sidebar
3. Click on "URL Configuration"

### Step 2: Add Allowed URLs
Add the following URLs to **all** these fields:

#### Site URL
```
https://www.nomaworld.co.ke
```

#### Redirect URLs (Add each one separately)
```
https://www.nomaworld.co.ke/**
https://nomaworld.co.ke/**
http://nomaworld.co.ke/**
http://www.nomaworld.co.ke/**
http://localhost:3000/**
```

⚠️ The wildcard `**` is important - it allows all paths under these domains.

### Step 3: CORS Configuration
In the same Authentication settings, ensure these domains are allowed:

1. Scroll to "Additional URLs" section
2. Add these domains to the allowed list:
   - `https://www.nomaworld.co.ke`
   - `https://nomaworld.co.ke`
   - `http://localhost:3000` (for local development)

### Step 4: Save Changes
Click "Save" to apply all changes.

## Testing the Fix

After configuring the Supabase dashboard:

1. **Clear browser cache and cookies** for your domain
2. Try registering a new user at: https://www.nomaworld.co.ke/signup
3. Check that:
   - No CORS errors appear in the browser console
   - Registration completes successfully
   - Confirmation email is sent

## Troubleshooting

### If CORS errors persist:
1. Double-check that ALL URLs are added to Supabase dashboard (including the wildcards)
2. Wait 1-2 minutes for Supabase configuration changes to propagate
3. Clear browser cache completely
4. Try in an incognito/private window

### If emails are not being received:
1. Check your Supabase email settings in Authentication > Email Templates
2. Verify that email confirmation is enabled
3. Check spam folder
4. Use the "Resend Confirmation" button on the signup page

### Check Database Connection:
Run this command to test the connection:
```bash
node test-db-connection.js
```

## Database Connection Status
✓ Auth service is accessible
✓ Environment variables are correctly configured
✓ Supabase client is properly initialized

## Additional Notes

- The app is configured to use HTTPS in production
- The auth flow uses PKCE for enhanced security
- Sessions are persisted in localStorage
- Email confirmation is required for new accounts

## Production Deployment

When deploying to production, ensure:
1. Environment variables are set correctly in your hosting platform
2. `NEXT_PUBLIC_APP_URL` points to your production domain
3. All redirect URLs are added to Supabase dashboard
4. SSL/HTTPS is properly configured

## Support

If issues persist after following these steps:
1. Check Supabase project logs in the dashboard
2. Check browser console for detailed error messages
3. Verify that your Supabase project is not paused or out of quota
