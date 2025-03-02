'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './styles.module.css';

export default function Profile() {
    const { data: session, status } = useSession();
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
        <div className={styles.profilePage}>
            <div className={styles.content}>
                <h1 className={styles.title}>Perfil do Usuário</h1>
                <div className={styles.userInfo}>
                    <p><strong>Nome:</strong> {session?.user?.name}</p>
                    <p><strong>Email:</strong> {session?.user?.email}</p>
                </div>
                <button onClick={() => signOut()} className={styles.signOutButton}>
                    Sair
                </button>
            </div>
        </div>
    );
}