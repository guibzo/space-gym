import { z } from 'zod'

export const createAccountSchema = z.object({
  name: z.string().min(2, { message: 'Seu nome deve ter ao menos 2 caracteres.' }),
  email: z.string().email({ message: 'Insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'Sua senha deve ter ao menos 6 caracteres.' }),
  confirmPassword: z.string().min(6),
})

export type CreateAccountSchema = z.infer<typeof createAccountSchema>
