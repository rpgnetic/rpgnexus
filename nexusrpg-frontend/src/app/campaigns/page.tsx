'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './styles.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';
import RPGSheet from '@/components/sheet/Sheet';
export default function Profile() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Carregando...</div>;
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <ProtectedRoute>
            <div className={styles.profilePage}>
                <RPGSheet />
            </div>
        </ProtectedRoute>
    );
}