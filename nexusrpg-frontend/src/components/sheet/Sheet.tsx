'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sheetSchema,
  SheetFormValues,
  fieldConfigs,
  skillConfigs,
} from '@/lib/schemas/sheetSchema';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SkillBox } from '../skillBox/SkillBox';
import { SheetWebSocket } from '@/lib/websocket';
import WeaponInventory from '../weaponInventory/WeaponInventory';

export default function RPGSheet() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [ws, setWs] = useState<SheetWebSocket | null>(null);

  const form = useForm<SheetFormValues>({
    resolver: zodResolver(sheetSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        player: '',
        occupation: '',
        age: 0,
        gender: '',
        residence: '',
        birthPlace: '',
        photo: '',
      },
      characteristics: {
        strength: 0,
        constitution: 0,
        height: 0,
        dexterity: 0,
        appearance: 0,
        intelligence: 0,
        power: 0,
        education: 0,
      },
      status: {
        hp: 1,
        sanity: 1,
        luck: 1,
        magic: 1,
      },
    },
  });

  useEffect(() => {
    const wsInstance = new SheetWebSocket('sheet-id-123', 'user-id-456');
    setWs(wsInstance);

    wsInstance.connect((update) => {
      Object.entries(update).forEach(([field, value]) => {
        form.setValue(field as keyof SheetFormValues, value);
      });
    });

    return () => wsInstance.disconnect();
  }, [form, form.control]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        form.setValue('personalInfo.photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: SheetFormValues) => {
    console.log(data);
    ws?.sendUpdate(data);
  };

  return (
    <Card className={styles.sheetContainer}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>Ficha de RPG</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <div className={styles.topSection}>
              {/* Foto do Personagem */}
              <div className={styles.photoSection}>
                <h2 className={styles.sectionTitle}>Foto do Personagem</h2>
                {photoPreview ? (
                  <div className={styles.photoPreview}>
                    <Image
                      src={photoPreview}
                      alt="Foto do Personagem"
                      fill
                      className={styles.photo}
                    />
                  </div>
                ) : (
                  <div className={styles.photoPreview}>
                    <div className={styles.photoPlaceholder}>
                      Adicione uma foto
                    </div>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="personalInfo.photo"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className={styles.fileInput}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Status */}
              <div className={styles.status}>
                <h2 className={styles.sectionTitle}>Status</h2>
                <div className={styles.attributesGrid}>
                  {fieldConfigs.status.fields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={`status.${field.name}` as keyof SheetFormValues}
                      render={({ field: formField }) => (
                        <FormItem className={styles.attributeBox}>
                          <div className={styles.attributeLabel}>
                            {field.label}
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              value={String(formField.value)}
                              onChange={(e) => {
                                let value = e.target.value
                                  ? parseInt(e.target.value)
                                  : 0;
                                // Aplicar limites específicos baseado no campo
                                if (field.name === 'luck') {
                                  value = Math.max(0, Math.min(100, value));
                                } else if (field.name === 'sanity') {
                                  value = Math.max(0, Math.min(100, value));
                                } else if (field.name === 'hp') {
                                  value = Math.max(0, Math.min(100, value));
                                } else if (field.name === 'magic') {
                                  value = Math.max(0, Math.min(100, value));
                                } else {
                                  // Para hp e magic, apenas garantir que não seja negativo
                                  value = Math.max(0, value);
                                }
                                formField.onChange(value);
                              }}
                              className={styles.mainValue}
                              min="0"
                              max={
                                field.name === 'luck'
                                  ? '100'
                                  : field.name === 'sanity'
                                    ? '99'
                                    : undefined
                              }
                              onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e') {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.bottomSection}>
              {/* Informações Pessoais */}
              <div className={styles.personalInfo}>
                <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
                {fieldConfigs.personalInfo.fields
                  .filter((field) => field.name !== 'photo')
                  .map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={
                        `personalInfo.${field.name}` as keyof SheetFormValues
                      }
                      render={({ field: formField }) => (
                        <FormItem className={styles.formItem}>
                          <FormLabel className={styles.formLabel}>
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type={field.type}
                              value={String(formField.value)}
                              onChange={(e) =>
                                formField.onChange(
                                  field.type === 'number'
                                    ? parseInt(e.target.value)
                                    : e.target.value
                                )
                              }
                              className={styles.formInput}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
              </div>

              {/* Características */}
              <div className={styles.characteristics}>
                <h2 className={styles.sectionTitle}>Características</h2>
                <div className={styles.attributesGrid}>
                  {fieldConfigs.characteristics.fields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={
                        `characteristics.${field.name}` as keyof SheetFormValues
                      }
                      render={({ field: formField }) => (
                        <FormItem className={styles.attributeBox}>
                          <div className={styles.attributeLabel}>
                            {field.label.substring(0, 3)}
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              value={String(formField.value)}
                              onChange={(e) => {
                                let value = e.target.value
                                  ? parseInt(e.target.value)
                                  : 0;
                                value = Math.max(0, Math.min(99, value));
                                value =
                                  parseInt(value.toString().slice(0, 2)) || 0;
                                formField.onChange(value);
                              }}
                              className={styles.mainValue}
                              min="0"
                              max="99"
                              onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e') {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.skillsContainer}>
              <h2 className={styles.sectionTitle}>Perícias</h2>
              <div className={styles.skillsContent}>
                {Object.entries(skillConfigs).map(([category, config]) => (
                  <div key={category} className={styles.skillGroup}>
                    <h3 className={styles.skillGroupTitle}>{config.title}</h3>
                    {config.fields.map((field) => (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={
                          `skills.${field.name}` as `skills.${typeof field.name}` &
                            keyof SheetFormValues
                        }
                        render={({ field: formField }) => (
                          <SkillBox
                            label={field.label}
                            value={Number(formField.value)}
                            baseValue={field.baseValue}
                            onChange={formField.onChange}
                          />
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.weaponContainer}>
              <WeaponInventory onWeaponChange={() => {}} />
            </div>

            <Button type="submit" className={styles.submitButton}>
              Salvar Ficha
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
