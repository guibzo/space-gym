import { WithImageBGLayout } from '@/components/layouts/with-image-bg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Div, H2, Span } from '@expo/html-elements'

export const SignIn = () => {
  return (
    <WithImageBGLayout>
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

        <Button variant='outline'>
          <Text className='text-primary'>Criar conta</Text>
        </Button>
      </Div>
    </WithImageBGLayout>
  )
}
