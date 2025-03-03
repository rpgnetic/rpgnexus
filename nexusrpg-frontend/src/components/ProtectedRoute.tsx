'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Carregando...</div>; // Você pode criar um componente de loading
    }

    return status === 'authenticated' ? children : null;
}