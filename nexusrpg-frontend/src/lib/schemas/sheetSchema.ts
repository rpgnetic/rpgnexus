import { z } from "zod";

const personalInfoSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    player: z.string().min(1, "Nome do jogador é obrigatório"),
    occupation: z.string().min(1, "Ocupação é obrigatória"),
    age: z.number().min(1, "Idade é obrigatória"),
    gender: z.string().min(1, "Gênero é obrigatório"),
    residence: z.string().min(1, "Local de residência é obrigatório"),
    birthPlace: z.string().min(1, "Local de nascimento é obrigatório"),
    photo: z.string().optional(),
});

const characteristicsSchema = z.object({
    strength: z.number().min(0).max(99),
    constitution: z.number().min(0).max(99),
    height: z.number().min(0).max(99),
    dexterity: z.number().min(0).max(99),
    appearance: z.number().min(0).max(99),
    intelligence: z.number().min(0).max(99),
    power: z.number().min(0).max(99),
    education: z.number().min(0).max(99),
});

const statusSchema = z.object({
    hp: z.number().min(0),
    sanity: z.number().min(0).max(100),
    luck: z.number().min(0).max(100),
    magic: z.number().min(0),
});

// Primeiro, vamos criar um tipo para as perícias que têm valores especiais
export type SpecialSkillValue = 'EDU' | '1/2 DES' | 'varia';

// Interface para definir uma perícia
interface SkillDefinition {
    label: string;
    baseValue: number | SpecialSkillValue;
    category: 'combat' | 'knowledge' | 'social' | 'technical' | 'movement' | 'other';
}

// Dicionário com todas as perícias e seus valores base
export const SKILL_DEFINITIONS: Record<string, SkillDefinition> = {
    // Conhecimentos
    anthropology: { label: 'Antropologia', baseValue: 1, category: 'knowledge' },
    archaeology: { label: 'Arqueologia', baseValue: 1, category: 'knowledge' },
    astronomy: { label: 'Astronomia', baseValue: 1, category: 'knowledge' },
    biology: { label: 'Biologia', baseValue: 1, category: 'knowledge' },
    botany: { label: 'Botânica', baseValue: 1, category: 'knowledge' },
    accounting: { label: 'Contabilidade', baseValue: 5, category: 'knowledge' },
    law: { label: 'Direito', baseValue: 5, category: 'knowledge' },
    // ... adicione todas as outras perícias aqui

    // Combate
    bow: { label: 'Arcos', baseValue: 15, category: 'combat' },
    firearms: { label: 'Armas de Fogo', baseValue: 'varia', category: 'combat' },
    heavyWeapons: { label: 'Armas Pesadas', baseValue: 10, category: 'combat' },
    brawl: { label: 'Briga', baseValue: 25, category: 'combat' },
    sword: { label: 'Espadas', baseValue: 20, category: 'combat' },
    
    // Continue adicionando todas as perícias...
};

// Modifique o skillsSchema para usar os valores base
const skillsSchema = z.object(
    Object.entries(SKILL_DEFINITIONS).reduce((acc, [key, definition]) => {
        if (typeof definition.baseValue === 'number') {
            acc[key] = z.number().min(definition.baseValue).max(99).default(definition.baseValue);
        } else {
            // Para perícias com valores especiais
            acc[key] = z.number().min(0).max(99).default(0);
        }
        return acc;
    }, {} as Record<string, z.ZodDefault<z.ZodNumber>>)
);

export const sheetSchema = z.object({
    personalInfo: personalInfoSchema,
    characteristics: characteristicsSchema,
    status: statusSchema,
    skills: skillsSchema
});

export type SheetFormValues = z.infer<typeof sheetSchema>;

// Modifique o skillConfigs para usar as definições
export const skillConfigs = {
    combat: {
        title: "Perícias de Combate",
        fields: Object.entries(SKILL_DEFINITIONS)
            .filter(([_, def]) => def.category === 'combat')
            .map(([name, def]) => ({
                name,
                label: def.label,
                baseValue: def.baseValue
            }))
    },
    knowledge: {
        title: "Conhecimentos",
        fields: Object.entries(SKILL_DEFINITIONS)
            .filter(([_, def]) => def.category === 'knowledge')
            .map(([name, def]) => ({
                name,
                label: def.label,
                baseValue: def.baseValue
            }))
    },
    social: {
        title: "Perícias Sociais",
        fields: [
            { name: "charm", label: "Charme", baseValue: 15 },
            { name: "intimidate", label: "Intimidação", baseValue: 15 },
            { name: "persuade", label: "Persuasão", baseValue: 10 },
            { name: "psychology", label: "Psicologia", baseValue: 10 },
        ]
    },
    technical: {
        title: "Técnicas",
        fields: [
            { name: "locksmith", label: " serralheiro", baseValue: 1 },
            { name: "mechanicalRepair", label: "Reparação Mecânica", baseValue: 10 },
            { name: "electricalRepair", label: "Reparação Elétrica", baseValue: 10 },
            { name: "firstAid", label: "Primeiros Socorros", baseValue: 30 },
        ]
    },
    movement: {
        title: "Movimento",
        fields: [
            { name: "climb", label: "Escalar", baseValue: 20 },
            { name: "swim", label: "Nadar", baseValue: 20 },
            { name: "stealth", label: "Furtividade", baseValue: 20 },
            { name: "dodge", label: "Esquivar", baseValue: 20 },
        ]
    },
    other: {
        title: "Outros",
        fields: [
            { name: "cthulhuMythos", label: "Mitologia Cthulhu", baseValue: 0 },
            { name: "occult", label: "Ocultismo", baseValue: 5 },
        ]
    },
};

export const fieldConfigs = {
    personalInfo: {
        title: "Informações Pessoais",
        fields: [
            { name: "name", label: "Nome", type: "text" },
            { name: "player", label: "Jogador", type: "text" },
            { name: "occupation", label: "Ocupação", type: "text" },
            { name: "age", label: "Idade", type: "number" },
            { name: "gender", label: "Gênero", type: "text" },
            { name: "residence", label: "Residência", type: "text" },
            { name: "birthPlace", label: "Local de Nascimento", type: "text" },
            { name: "photo", label: "Foto do Personagem", type: "file" },
        ]
    },
    characteristics: {
        title: "Características",
        fields: [
            { name: "strength", label: "Força", type: "number" },
            { name: "constitution", label: "Constituição", type: "number" },
            { name: "height", label: "Altura", type: "number" },
            { name: "dexterity", label: "Destreza", type: "number" },
            { name: "appearance", label: "Aparência", type: "number" },
            { name: "intelligence", label: "Inteligência", type: "number" },
            { name: "power", label: "Poder", type: "number" },
            { name: "education", label: "Educação", type: "number" },
        ]
    },
    status: {
        title: "Status",
        fields: [
            { name: "hp", label: "Pontos de Vida", type: "number" },
            { name: "sanity", label: "Sanidade", type: "number" },
            { name: "luck", label: "Sorte", type: "number" },
            { name: "magic", label: "Pontos de Magia", type: "number" },
        ]
    }
};


