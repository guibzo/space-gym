import { LucideLoaderCircle } from '@/components/icons'
import { AuthLayout } from '@/components/layouts/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/axios'
import type { AuthNavigatorRoutesProps } from '@/routes/auth.routes'
import { Div, H2, Span } from '@expo/html-elements'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { signInSchema, type SignInSchema } from './sign-in-schema'

export const SignInScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const { setUserData } = useAuth()

  const handleSignIn = async ({ email, password }: SignInSchema) => {
    try {
      setIsAuthenticating(true)

      const { data: signInResponse } = await api.post('/sessions', {
        email,
        password,
      })

      if (signInResponse.user) {
        setUserData(signInResponse.user)
      }
    } catch (error: any) {
      Alert.alert(
        error.response.data.message ??
          'Não foi possível acessar sua conta. Tente novamente mais tarde.'
      )
      // TO-DO: Add toast
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <AuthLayout>
      <Div className='flex flex-col gap-4 w-full'>
        <H2 className='text-center text-foreground'>Acesse sua conta</H2>

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
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
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
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {errors.password && <Text className='m-0 text-red-500'>{errors.password.message}</Text>}
        </Div>

        <Button
          onPress={handleSubmit(handleSignIn)}
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <LucideLoaderCircle
              className='animate-spin text-neutral-100'
              size={20}
            />
          ) : (
            <Text>Acessar</Text>
          )}
        </Button>
      </Div>

      <Div className='flex flex-col gap-4 w-full'>
        <Span className='text-center text-foreground'>Ainda não tem conta?</Span>

        <Button
          variant='outline'
          onPress={() => navigate('signUp')}
        >
          <Text className='text-primary'>Criar conta</Text>
        </Button>
      </Div>
    </AuthLayout>
  )
}
