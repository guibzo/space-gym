import { WithImageBGLayout } from '@/components/layouts/with-image-bg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Div, H2 } from '@expo/html-elements'

export const SignUp = () => {
  return (
    <WithImageBGLayout>
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
      >
        <Text className='text-primary'>Voltar para o login</Text>
      </Button>
    </WithImageBGLayout>
  )
}
