import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './styles.module.scss';
import { weaponSchema, WeaponFormValues } from "@/lib/schemas/inventorySchema";


interface WeaponInventoryProps {
    onWeaponChange: (weapon: WeaponFormValues) => void;
}

export default function WeaponInventory({ onWeaponChange }: WeaponInventoryProps) {
    const form = useForm<WeaponFormValues>({
        resolver: zodResolver(weaponSchema),
        defaultValues: {
            name: "",
            damage: "",
            range: "",
            ammo: 0,
            bonusDamage: "",
        },
    });

    const handleSubmit = (data: WeaponFormValues) => {
        onWeaponChange(data);
    };

    return (
        <Card className={styles.weaponCard}>
            <CardHeader className={styles.cardHeader}>
                <CardTitle>Inventário de Armas</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <div className={styles.weaponForm}>
                        <div className={styles.weaponGrid}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da Arma</FormLabel>
                                        <FormControl>
                                            <Input {...field} className={styles.weaponInput} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="damage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dano</FormLabel>
                                        <FormControl>
                                            <Input {...field} className={styles.weaponInput} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="range"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alcance</FormLabel>
                                        <FormControl>
                                            <Input {...field} className={styles.weaponInput} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ammo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Munição</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                                className={styles.weaponInput}
                                                min="0"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bonusDamage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dano Bônus</FormLabel>
                                        <FormControl>
                                            <Input {...field} className={styles.weaponInput} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <Button
                                type="button"
                                className={styles.addButton}
                                onClick={() => form.handleSubmit(handleSubmit)()}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Adicionar Arma
                            </Button>
                        </div>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
}

