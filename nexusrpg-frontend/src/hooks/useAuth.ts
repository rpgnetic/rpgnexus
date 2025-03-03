'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn('google', {
        redirect: true,
        callbackUrl: '/dashboard',
      });

      if (!result) {
        throw new Error('Falha na autenticação');
      }

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      setError('Falha ao realizar login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    status,
    isLoading,
    error,
    handleGoogleSignIn,
    handleSignOut,
    isAuthenticated: status === 'authenticated',
  };
}
