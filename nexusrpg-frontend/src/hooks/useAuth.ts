'use client';

import { useSession, signIn } from 'next-auth/react';
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
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
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
    isAuthenticated: status === 'authenticated',
  };
}
