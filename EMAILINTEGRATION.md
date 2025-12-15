# Email Integration Documentation - NOMA

## Overview
NOMA uses a comprehensive email system with different email addresses for different purposes, all managed through the same SMTP server.

## Email Addresses & Their Purposes

### 1. **support@nomaworld.co.ke** 
- **Purpose**: Registration confirmations, package subscriptions, and general support
- **Used For**:
  - Email confirmation during registration
  - Package purchase confirmations
  - Subscription service notifications
  - General customer support communications

### 2. **admin@nomaworld.co.ke**
- **Purpose**: Payment confirmations and account upgrades
- **Used For**:
  - Payment success notifications
  - Account upgrade confirmations
  - Billing-related communications
  - Transaction receipts

### 3. **info@nomaworld.co.ke**
- **Purpose**: Assessment results and general notifications
- **Used For**:
  - Assessment result delivery
  - General platform notifications
  - Educational content
  - Newsletter communications

## How Email Confirmation Works

### Registration Flow

1. **User Signs Up** (`/signup`)
   - User enters email and password
   - System creates account in Supabase with `email_confirmed_at = null`
   - Supabase automatically sends confirmation email from `support@nomaworld.co.ke`

2. **Confirmation Email Sent**
   - Supabase sends email with confirmation link
   - Link format: `http://nomaworld.co.ke/auth/confirm?token_hash=...&type=email`
   - Email template includes:
     - NOMA branding
     - Confirmation button
     - Manual link fallback
     - Support contact information

3. **User Clicks Confirmation Link**
   - Redirected to `/auth/confirm` page
   - System validates token_hash
   - If valid: Sets `email_confirmed_at` timestamp
   - If invalid: Shows error message with retry options

4. **Confirmation Success**
   - User automatically redirected to `/dashboard`
   - Account fully activated
   - Can now log in and access all features

### Resend Confirmation Flow

If user doesn't receive the email:

1. **Resend Button** (on signup success page)
   - Visible immediately after signup
   - Calls API: `POST /api/auth/resend-confirmation`
   - Uses Supabase `resend()` method

2. **API Handler**
   - Validates email exists
   - Triggers new confirmation email from Supabase
   - Returns success/error message

3. **User Feedback**
   - Success: "Confirmation email sent! Please check your inbox."
   - Error: Displays specific error message
   - Can retry multiple times if needed

## Supabase Configuration

### Email Settings in Supabase Dashboard

1. **Navigate to**: Authentication > Email Templates
2. **Confirm Signup Template**: Customized with NOMA branding
3. **Email Rate Limits**: Configure in Authentication settings
4. **Redirect URLs**: Whitelisted in Authentication > URL Configuration
   - `http://nomaworld.co.ke/auth/confirm`
   - `https://nomaworld.co.ke/auth/confirm`

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://owoltswdqcgkatewucrq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# SMTP Configuration (for custom emails)
SMTP_HOST=smtp.nomaworld.co.ke
SMTP_PORT=587
SMTP_PASS=Kemoda@2039

# App URL (for email links)
NEXT_PUBLIC_APP_URL=http://nomaworld.co.ke
```

## Email Service Functions

### Located in: `src/lib/email.ts`

#### 1. `sendRegistrationEmail(email, confirmationUrl)`
- **Sender**: support@nomaworld.co.ke
- **Purpose**: Manual registration emails (if needed)
- **Template**: Professional HTML email with NOMA branding

#### 2. `sendPackagePurchaseEmail(email, packageName, amount)`
- **Sender**: support@nomaworld.co.ke
- **Purpose**: Package subscription confirmations
- **Includes**: Package details, pricing, support contact

#### 3. `sendPaymentSuccessEmail(email, orderDetails)`
- **Sender**: admin@nomaworld.co.ke
- **Purpose**: Payment confirmation and receipts
- **Includes**: Order ID, package name, amount paid, dashboard link

#### 4. `sendAssessmentResultsEmail(email, resultUrl)`
- **Sender**: info@nomaworld.co.ke
- **Purpose**: Deliver assessment results
- **Includes**: Results link, guidance disclaimer

## API Routes

### `/api/auth/resend-confirmation` (POST)
- **Purpose**: Resend email confirmation
- **Body**: `{ "email": "user@example.com" }`
- **Response**: 
  - Success: `{ "success": true, "message": "..." }`
  - Error: `{ "error": "..." }`

## Pages

### `/signup` - Registration Page
- Email/password form
- Success message with email sent notification
- Resend confirmation button
- Link to login page

### `/auth/confirm` - Email Confirmation Page
- Validates confirmation token
- Shows loading/success/error states
- Auto-redirects to dashboard on success
- Provides retry options on failure

## Customization

### To Customize Email Templates:

1. **Supabase Default Emails**:
   - Go to Supabase Dashboard
   - Authentication > Email Templates
   - Edit HTML templates directly

2. **Custom SMTP Emails**:
   - Edit `src/lib/email.ts`
   - Modify HTML templates in each function
   - Update branding, colors, copy as needed

## Testing

### Test Email Confirmation Flow:

1. Sign up with a valid email address
2. Check inbox for confirmation email
3. Click confirmation link
4. Verify redirect to dashboard

### Test Resend Functionality:

1. Sign up with email
2. Click "Resend Confirmation Email" button
3. Verify second email arrives
4. Confirm both links work

## Troubleshooting

### User Not Receiving Emails

1. **Check spam folder**: Advise user to check spam/junk
2. **Verify email address**: Ensure no typos in email
3. **Check Supabase logs**: Authentication > Logs for errors
4. **SMTP issues**: Verify SMTP credentials in .env.local
5. **Rate limiting**: Check if user exceeded retry limits

### Confirmation Link Not Working

1. **Token expired**: Tokens expire after 1 hour - resend email
2. **Invalid URL**: Check NEXT_PUBLIC_APP_URL is correct
3. **Already confirmed**: User may have already confirmed
4. **Database issue**: Check Supabase auth.users table

### Email Not Sending

1. **SMTP credentials**: Verify in .env.local
2. **Port blocked**: Ensure port 587 is not blocked
3. **DNS issues**: Verify smtp.nomaworld.co.ke resolves
4. **Authentication**: Check SMTP password is correct

## Security Notes

- All confirmation tokens are single-use only
- Tokens expire after 1 hour
- Email addresses are validated before sending
- SMTP credentials stored securely in environment variables
- Service role key used server-side only (never exposed to client)

## Future Enhancements

- [ ] Add email verification status badge in user profile
- [ ] Implement email change workflow with confirmation
- [ ] Add welcome email series after confirmation
- [ ] Track email open rates and engagement
- [ ] Implement email preferences management
