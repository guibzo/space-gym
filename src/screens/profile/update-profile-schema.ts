import { z } from 'zod'

export const updateProfileSchema = z
  .object({
    name: z
      .string({ required_error: 'Informe seu nome de usuário.' })
      .min(2, 'Seu nome deve ter ao menos 2 caracteres.'),
    email: z.string().email('Insira um e-mail válido.'),
    oldPassword: z
      .string()
      .min(6, 'Sua senha deve ter pelo menos 6 caracteres.')
      .optional()
      .nullable()
      .transform((value) => (value === '' ? undefined : value)),
    newPassword: z
      .string()
      .min(6, 'Sua senha deve ter pelo menos 6 caracteres.')
      .optional()
      .nullable()
      .transform((value) => (value === '' ? undefined : value)),
    confirmNewPassword: z
      .string({ required_error: 'Este campo é obrigatório.' })
      .optional()
      .nullable()
      .transform((value) => (value === '' ? undefined : value)),
  })
  .superRefine(({ confirmNewPassword, newPassword, oldPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas devem ser iguais.',
        path: ['confirmNewPassword'],
      })
    }

    if ((newPassword || confirmNewPassword) && !oldPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Insira sua senha atual.',
        path: ['oldPassword'],
      })
    }
  })

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
