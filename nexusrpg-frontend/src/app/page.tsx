'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import styles from './page.module.css';
import logo from '../../public/logo.svg';
import { loginSchema } from '@/lib/schemas';
import { useAuth } from '@/hooks/useAuth';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Home() {
  const { handleGoogleSignIn, isLoading, error } = useAuth();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
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
          <h1 className={styles.title}>RPG NEXUS</h1>
        </div>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>Entrar</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={styles.inputGroup}>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          disabled={isLoading}
                        />
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
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </Form>

            <Button
              onClick={handleGoogleSignIn}
              className={styles.googleButton}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? 'Carregando...' : 'Entrar com Google'}
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

