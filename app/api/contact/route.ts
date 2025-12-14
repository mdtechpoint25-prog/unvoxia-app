import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Try to insert into database (if contact_messages table exists)
    try {
      // Using any to bypass type check since contact_messages is not yet in schema types
      const { error: dbError } = await (supabase as unknown as { from: (table: string) => { insert: (data: Record<string, unknown>) => { error: unknown } } })
        .from('contact_messages')
        .insert({
          name,
          email,
          subject,
          message,
          status: 'new',
          created_at: new Date().toISOString()
        });

      if (dbError) {
        // Log error but don't fail the request - table might not exist yet
        console.warn('Could not save to database:', dbError);
      }
    } catch (dbErr) {
      // Database might not have the table yet
      console.warn('Database operation failed:', dbErr);
    }

    // In production, you would also send an email notification here
    // For now, we just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
