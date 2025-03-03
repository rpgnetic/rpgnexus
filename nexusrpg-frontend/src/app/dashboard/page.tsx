'use client';

import { signOut, useSession } from 'next-auth/react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Container, Grid2 } from '@mui/material';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { formatDate } from '@/utils/formatDate';

import styles from './styles.module.scss';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return null; // Trocar por um componente de loading depois 
  }

  const randomMock = [
    {
      id: 1,
      name: 'John Wick',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 2,
      name: 'Sarah Connor',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 3,
      name: 'Ethan Hunt',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 4,
      name: 'James Bond',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 5,
      name: 'Jason Bourne',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 6,
      name: 'Lara Croft',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 7,
      name: 'Dominic Toretto',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 8,
      name: 'Indiana Jones',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    { id: 9, name: 'Neo', createDate: new Date(), lastTimeOpen: new Date() },
    {
      id: 10,
      name: 'Tony Stark',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
    {
      id: 11,
      name: 'Steve Rogers',
      createDate: new Date(),
      lastTimeOpen: new Date(),
    },
  ];

  const handleDelete = (id: number) => {
    console.log(`Deleting ${id}`);
  };

  return (
    <ProtectedRoute>
      <Container className={styles.container} maxWidth="lg">
        <Grid2 minHeight={'100vh'} display={'flex'} flexDirection={'column'}>
          <div className={styles.header}>
            <div className={styles.userContainer}>
              <div className={styles.imageContainer}>
                <Avatar>
                  <AvatarImage src={session?.user.image} alt="Foto de perfil" />
                  <AvatarFallback
                    style={{ color: '#FFF', background: '#2478A8' }}
                    color="#FFF"
                  >
                    {session?.user.name?.split(' ')[0][0]}
                    {session?.user.name?.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Label className={styles.userName}>
                {session?.user.name?.split(' ')[0]}
              </Label>
            </div>
            <Button onClick={() => signOut()} className={styles.logoffButton}>
              Sair <LogoutIcon fontSize="small" />
            </Button>
          </div>
          <div className={styles.body}>
            <AlertDialog>
              <div className="w-[600px] flex justify-end">
                <AlertDialogTrigger className={styles.modalTrigger}>
                  <AddCircleOutlineIcon fontSize="small" />
                  Nova campanha
                </AlertDialogTrigger>
              </div>
              <AlertDialogContent className={styles.modalContainer}>
                <AlertDialogHeader className={styles.modalHeader}>
                  <AlertDialogTitle className={styles.modalTitle}>
                    Uma nova aventura...
                  </AlertDialogTitle>
                  <AlertDialogDescription className={styles.modalContent}>

                    Deseja tomar as redeas e contar uma nova história ou vai
                    cair de cabeça numa aventura já existente? Caso vá ingressar
                    numa campanha, digite o código da campanha e se prepare para
                    a aventura

                    <Input
                      placeholder="Código da campanha"
                      style={{ marginTop: 16, padding: 8, color: '#FEF5EF' }}
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={styles.modalFooter}>
                  <AlertDialogCancel className={styles.cancelButton}>
                    Cancelar
                  </AlertDialogCancel>
                  <div className="flex gap-2">
                    <AlertDialogAction className={styles.actionButton}>
                      Criar nova campanha
                    </AlertDialogAction>
                    <AlertDialogAction className={styles.actionButton}>
                      Criar nova ficha
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Tabs defaultValue="minhas-fichas" className={styles.tabsContainer}>
              <TabsList className={styles.tabsOptionsContainer}>
                <TabsTrigger value="minhas-fichas" className={styles.tabsTrigger}>
                  Minhas fichas
                </TabsTrigger>
                <TabsTrigger
                  value="minhas-historias"
                  className={styles.tabsTrigger}
                >
                  Minhas histórias
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="minhas-fichas"
                className={styles.optionSheetContainer}
              >
                {randomMock.length > 0 ? (
                  randomMock.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={styles.optionSheet}
                        onClick={() => console.log(item.id)}
                      >
                        <div>
                          <h4>
                            {item.name} <span>{formatDate(item.createDate)}</span>
                          </h4>{' '}
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger className={styles.deleteButton}>
                            <DeleteIcon />
                          </AlertDialogTrigger>
                          <AlertDialogContent className={styles.modalContainer}>
                            <AlertDialogHeader className={styles.modalHeader}>
                              <AlertDialogTitle className={styles.modalTitle}>
                                O que foi feito não pode ser desfeito
                              </AlertDialogTitle>
                              <AlertDialogDescription
                                className={styles.modalContent}
                              >
                                Essa é uma ação irreversível. Tem certeza que
                                deseja excluir sua ficha?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className={styles.modalFooter}>
                              <AlertDialogCancel className={styles.actionButton}>
                                Cancelar
                              </AlertDialogCancel>
                              <div>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item.id)}
                                  className={styles.cancelButton}
                                >
                                  Excluir ficha
                                </AlertDialogAction>
                              </div>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    );
                  })
                ) : (
                  <h2>Nada pra ver por aqui...</h2>
                )}
              </TabsContent>
              <TabsContent
                value="minhas-historias"
                className={styles.optionSheetContainer}
              >
                {randomMock.length > 0 ? (
                  randomMock.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={styles.optionSheet}
                        onClick={() => console.log(item.id)}
                      >
                        <div>
                          <h4>
                            {item.name} <span>{formatDate(item.createDate)}</span>
                          </h4>{' '}
                        </div>
                        <button className={styles.deleteButton}>
                          <DeleteIcon />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <h2>Nada pra ver por aqui...</h2>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </Grid2>
      </Container>
    </ProtectedRoute>
  );
}
