'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthContextType {
  user: {
    id: string;
    email: string | null;
    name: string | null;
  } | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({ error: null }),
  signInWithGoogle: async () => ({ error: null }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthContextType['user']>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      setUser({
        id: session.user.id || '',
        email: session.user.email || null,
        name: session.user.name || null,
      });
    } else {
      setUser(null);
    }
  }, [session, status]);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { error: new Error(result.error) };
      }

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('خطا در ورود') };
    }
  };

  const signInWithGoogle = async () => {
    try {
      await nextAuthSignIn('google', {
        callbackUrl: '/dashboard',
      });

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('خطا در ورود با گوگل') };
    }
  };

  const signOut = async () => {
    await nextAuthSignOut({ callbackUrl: '/login' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: status === 'loading', 
      signOut, 
      signIn, 
      signInWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
