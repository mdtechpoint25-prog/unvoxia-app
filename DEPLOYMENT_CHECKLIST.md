# 🚀 Deployment Checklist - Registration Fix

## Issue Diagnosis

The 400 error with HTML response means the server is crashing before it can return JSON. This is typically caused by **missing environment variables** in your production environment.

## ✅ Pre-Deployment Checklist

### 1. Verify Environment Variables are Set in Production

Your hosting platform MUST have these environment variables configured:

#### Required for Auth API Routes:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://owoltswdqcgkatewucrq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://www.nomaworld.co.ke
```

#### Optional but Recommended:
```bash
SUPABASE_PROJECT_ID=owoltswdqcgkatewucrq
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=eyJhbGci...
CLOUDINARY_CLOUD_NAME=dqpguvzjx
CLOUDINARY_API_KEY=133588853133291
CLOUDINARY_API_SECRET=ssooeFim3...
SMTP_HOST=smtp.nomaworld.co.ke
SMTP_PORT=587
SMTP_PASS=Kemoda@2039
SMTP_EMAIL_INFO=info@nomaworld.co.ke
SMTP_EMAIL_SUPPORT=support@nomaworld.co.ke
SMTP_EMAIL_NOREPLY=noreply@nomaworld.co.ke
SESSION_SECRET=your-secret-key
```

### 2. Check Your Hosting Platform

Depending on where you're hosting:

#### Vercel:
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all required variables
5. Redeploy after adding variables

#### Netlify:
1. Go to: https://app.netlify.com
2. Select your site
3. Go to Site settings → Environment variables
4. Add all required variables
5. Redeploy

#### Other Platforms:
- Ensure environment variables are set in your deployment configuration
- Variables must be available at build time AND runtime

### 3. Deploy Latest Code

```bash
# Code is already pushed to GitHub
# Trigger a new deployment on your hosting platform
```

## 🔍 Diagnostic Tools

### Check Configuration Endpoint (Development Only)

After deployment, you can check if environment variables are properly set:

```bash
# In development:
curl http://localhost:3000/api/debug/config

# In production (only works with DEBUG_TOKEN):
curl -H "x-debug-token: YOUR_DEBUG_TOKEN" https://www.nomaworld.co.ke/api/debug/config
```

Expected response should show all variables as "SET":
```json
{
  "environment": "production",
  "supabase": {
    "url": "SET",
    "anonKey": "SET",
    "serviceRoleKey": "SET",
    "projectId": "SET"
  },
  "app": {
    "url": "https://www.nomaworld.co.ke"
  }
}
```

If any show "MISSING", that's the problem!

## 🐛 Troubleshooting

### Error: "Unexpected token '<', '<!DOCTYPE'..."

**Cause**: Server is returning an HTML error page instead of JSON
**Solution**: Check that `SUPABASE_SERVICE_ROLE_KEY` is set in production

### Error: "Server configuration error"

**Cause**: Missing environment variables
**Solution**: 
1. Check deployment platform environment variables
2. Ensure variables are set for production environment
3. Redeploy after adding variables

### Error: "Failed to fetch"

**Cause**: API route is not accessible
**Solution**:
1. Check deployment logs
2. Verify the build was successful
3. Check that the API route exists in production

## 📝 Testing After Deployment

1. **Clear browser cache** completely
2. Go to: https://www.nomaworld.co.ke/signup
3. Open browser DevTools (F12) → Console tab
4. Try to register with a test email
5. Check the console for errors

### Expected Success Flow:
```
POST /api/auth/signup → 200 OK
Response: { "success": true, "message": "Account created..." }
```

### If Still Failing:
1. Check browser console for the exact error
2. Check server logs in your hosting platform
3. Verify all environment variables are set
4. Try the debug config endpoint

## 🔑 Critical Environment Variables

The most critical variables for registration to work:

1. ✅ `NEXT_PUBLIC_SUPABASE_URL` - Must match your Supabase project
2. ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
3. ✅ `SUPABASE_SERVICE_ROLE_KEY` - **CRITICAL** - Used by signup API route
4. ✅ `NEXT_PUBLIC_APP_URL` - Must be your production URL with HTTPS

## 📞 Need Help?

If the issue persists after checking all the above:

1. **Check deployment logs** for the exact error message
2. **Verify environment variables** are actually set (not just saved but not applied)
3. **Ensure you redeployed** after adding environment variables
4. **Contact your hosting provider** if variables aren't being loaded

## ✨ What Changed

The latest deployment includes:
- ✅ Better error handling (no crashes on missing env vars)
- ✅ Proper error messages returned as JSON
- ✅ Environment variable validation
- ✅ Debug endpoint to check configuration
- ✅ Improved logging for troubleshooting

All changes are in: [commit c89be4a](https://github.com/mdtechpoint25-prog/unvoxia-app/commit/c89be4a)
