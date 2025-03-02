'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="RPG Nexus Logo"
            width={200}
            height={200}
            priority
            className={styles.logo}
          />
          <h1 className={styles.title}>RPG Nexus</h1>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/register" className={styles.button}>
            Criar Conta
          </Link>
          <Link href="/login" className={styles.buttonOutline}>
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
