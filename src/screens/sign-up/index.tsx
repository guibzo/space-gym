import { AuthLayout } from '@/components/layouts/auth'
import { LoadingIndicator } from '@/components/loading-indicator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/axios'
import type { AuthNavigatorRoutesProps } from '@/routes/auth.routes'
import { Div, H2 } from '@expo/html-elements'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { createAccountSchema, type CreateAccountSchema } from './create-account-schema'

export const SignUpScreen = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  })

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()

  const handleCreateAccount = async ({ name, email, password }: CreateAccountSchema) => {
    try {
      setIsCreatingAccount(true)

      await api.post('/users', {
        name,
        email,
        password,
      })

      signIn({
        email,
        password,
      })
    } catch (error: any) {
      Alert.alert(
        error.response.data.message ??
          'Não foi possível criar sua conta. Tente novamente mais tarde.'
      )
      // TO-DO: Add toast
    } finally {
      setIsCreatingAccount(false)
    }
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
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          {errors.name && <Text className='m-0 text-red-500'>{errors.name.message}</Text>}
        </Div>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='email'
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='email-address'
                placeholder='E-mail'
                value={value}
                autoCapitalize='none'
                onChangeText={onChange}
              />
            )}
          />

          {errors.email && <Text className='m-0 text-red-500'>{errors.email.message}</Text>}
        </Div>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='password'
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                autoCapitalize='none'
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          {errors.password && <Text className='m-0 text-red-500'>{errors.password.message}</Text>}
        </Div>

        <Div className='flex flex-col gap-1'>
          <Controller
            control={control}
            name='confirmPassword'
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirme a senha'
                autoCapitalize='none'
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          {errors.confirmPassword && (
            <Text className='m-0 text-red-500'>{errors.confirmPassword.message}</Text>
          )}
        </Div>

        <Button
          onPress={handleSubmit(handleCreateAccount)}
          disabled={isCreatingAccount}
        >
          {isCreatingAccount ? <LoadingIndicator /> : <Text>Criar e acessar</Text>}
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
