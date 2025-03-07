import { z } from "zod";

export const weaponSchema = z.object({
  name: z.string().min(1, "Nome da arma é obrigatório"),
  damage: z.string().min(1, "Dano é obrigatório"),
  range: z.string(),
  ammo: z.number().min(0),
  bonusDamage: z.string(),
});

export const combatSchema = z.object({
  dodgeChance: z.number().min(0).max(99),
  damageBonus: z.number().min(0),
});

export const inventorySchema = z.object({
  item: z.string().min(1, "Item é obrigatório"),
  quantity: z.number().min(0),
  weight: z.number().min(0),
  value: z.number().min(0),
  description: z.string().min(1, "Descrição é obrigatória"),
});

export type WeaponFormValues = z.infer<typeof weaponSchema>;
export type CombatFormValues = z.infer<typeof combatSchema>;
export type InventoryFormValues = z.infer<typeof inventorySchema>;
