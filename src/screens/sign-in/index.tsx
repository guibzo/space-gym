import { AuthLayout } from '@/components/layouts/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import type { AuthNavigatorRoutesProps } from '@/routes/auth.routes'
import { Div, H2, Span } from '@expo/html-elements'
import { useNavigation } from '@react-navigation/native'

export const SignInScreen = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <AuthLayout>
      <Div className='flex flex-col gap-4 w-full'>
        <H2 className='text-center text-foreground'>Acesse sua conta</H2>

        <Input
          keyboardType='email-address'
          placeholder='E-mail'
          autoCapitalize='none'
        />

        <Input
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry
        />

        <Button>
          <Text>Acessar</Text>
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
