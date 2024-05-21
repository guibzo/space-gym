import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .email('Insira um e-mail válido.'),
  password: z.string({ required_error: 'Este campo é obrigatório.' }),
})

export type SignInSchema = z.infer<typeof signInSchema>
