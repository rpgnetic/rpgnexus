import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome muito longo"),
  username: z
    .string()
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
    .max(20, "Nome de usuário muito longo"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter letras maiúsculas, minúsculas e números"
    ),
});
