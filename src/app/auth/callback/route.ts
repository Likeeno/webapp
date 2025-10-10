import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { telegramService } from '@/lib/telegram';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Check if this is a new user by checking if profile was just created
      const { data: userProfile } = await supabase
        .from('users')
        .select('created_at')
        .eq('id', data.user.id)
        .single();

      // If user was created in the last minute, it's a new registration
      if (userProfile) {
        const createdAt = new Date(userProfile.created_at);
        const now = new Date();
        const diffMinutes = (now.getTime() - createdAt.getTime()) / 1000 / 60;

        if (diffMinutes < 1) {
          // New user - send Telegram notification (non-blocking)
          const { data: profile } = await supabase
            .from('users')
            .select('name')
            .eq('id', data.user.id)
            .single();

          telegramService.notifyNewUser({
            name: profile?.name || data.user.email?.split('@')[0] || 'کاربر',
            email: data.user.email || '',
            userId: data.user.id,
          }).catch(err => console.error('Telegram notification error:', err));
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
