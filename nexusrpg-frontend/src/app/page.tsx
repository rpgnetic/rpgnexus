'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import styles from './page.module.css';
import logo from '../../public/logo.svg';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Home() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error('Erro ao fazer login:', result.error);
      } else {
        console.log('Login bem-sucedido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: 'http://localhost:3000' });
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="RPG Nexus Logo"
            width={200}
            height={200}
            priority
            className={styles.logo}
          />
          <h1 className={styles.title}>RPG Nexus</h1>
        </div>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>Entrar</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={styles.form}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={styles.inputGroup}>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className={styles.inputGroup}>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className={styles.submitButton}>
                  Entrar
                </Button>
              </form>
            </Form>
            <Button
              onClick={handleGoogleSignIn}
              className={styles.googleButton}
            >
              Entrar com Google
            </Button>
            <div className={styles.links}>
              <Link href="/register" className={styles.link}>
                Criar Conta
              </Link>
              <Link href="/forgot-password" className={styles.link}>
                Esqueci a Senha
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
