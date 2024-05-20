import { AuthLayout } from '@/components/layouts/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import type { AuthNavigatorRoutesProps } from '@/routes/auth.routes'
import { Div, H2 } from '@expo/html-elements'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const createAccountSchema = z.object({
  name: z.string().min(2, { message: 'Seu nome deve ter ao menos 2 caracteres.' }),
  email: z.string().email({ message: 'Insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'Sua senha deve ter ao menos 6 caracteres.' }),
  confirmPassword: z.string().min(6),
})

type CreateAccountSchema = z.infer<typeof createAccountSchema>

export const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  })

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <Div className='flex flex-col gap-4 w-full'>
        <H2 className='text-center text-foreground'>Crie sua conta</H2>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='name'
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
              />
            )}
          />

          {errors.name && (
            <Text className='m-0 text-red-500'>Insira seu nome com ao menos 2 caracteres.</Text>
          )}
        </Div>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='email'
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Input
                keyboardType='email-address'
                placeholder='E-mail'
                autoCapitalize='none'
                onChangeText={onChange}
              />
            )}
          />

          {errors.email && <Text className='m-0 text-red-500'>Insira um e-mail válido.</Text>}
        </Div>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='password'
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder='Senha'
                autoCapitalize='none'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          {errors.password && (
            <Text className='m-0 text-red-500'>Insira uma senha com 6 ou mais caracteres.</Text>
          )}
        </Div>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='confirmPassword'
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder='Confirme a senha'
                autoCapitalize='none'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          {errors.confirmPassword && (
            <Text className='m-0 text-red-500'>Insira uma senha com 6 ou mais caracteres.</Text>
          )}
        </Div>

        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Criar e acessar</Text>
        </Button>
      </Div>

      <Button
        variant='outline'
        className='w-full'
        onPress={() => navigate('signIn')}
      >
        <Text className='text-primary'>Voltar para o login</Text>
      </Button>
    </AuthLayout>
  )
}
