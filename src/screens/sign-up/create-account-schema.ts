import { z } from 'zod'

export const createAccountSchema = z
  .object({
    name: z
      .string({ required_error: 'Este campo é obrigatório.' })
      .min(2, 'Seu nome deve ter ao menos 2 caracteres.'),
    email: z
      .string({ required_error: 'Este campo é obrigatório.' })
      .email('Insira um e-mail válido.'),
    password: z
      .string({ required_error: 'Este campo é obrigatório.' })
      .min(6, 'Sua senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z
      .string({ required_error: 'Este campo é obrigatório.' })
      .min(6, 'Sua senha deve ter pelo menos 6 caracteres.'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas devem ser iguais.',
        path: ['confirmPassword'],
      })
    }
  })

export type CreateAccountSchema = z.infer<typeof createAccountSchema>
