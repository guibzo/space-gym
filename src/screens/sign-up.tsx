import { AuthLayout } from '@/components/layouts/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import type { AuthNavigatorRoutesProps } from '@/routes/auth.routes'
import { Div, H2 } from '@expo/html-elements'
import { useNavigation } from '@react-navigation/native'

export const SignUpScreen = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <AuthLayout>
      <Div className='flex flex-col gap-4 w-full'>
        <H2 className='text-center text-foreground'>Crie sua conta</H2>

        <Input placeholder='Nome' />

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

        <Input
          placeholder='Confirme a senha'
          autoCapitalize='none'
          secureTextEntry
        />

        <Button>
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
