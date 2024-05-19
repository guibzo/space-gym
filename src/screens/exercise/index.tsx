import { AppHeaderContainer } from '@/components/app-header-container'
import {
  LucideArrowLeft,
  LucideDumbbell,
  LucidePersonStanding,
  LucideRepeat,
} from '@/components/icons'
import { AppLayout } from '@/components/layouts/app'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Div } from '@expo/html-elements'
import { useNavigation } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native'

export const ExerciseScreen = () => {
  const { goBack } = useNavigation()

  return (
    <>
      <AppHeaderContainer>
        <TouchableOpacity onPress={() => goBack()}>
          <LucideArrowLeft
            size={24}
            className='text-primary'
          />
        </TouchableOpacity>

        <Div className='flex w-full items-center flex-row justify-between mt-3'>
          <Text className='text-lg font-semibold'>Puxada frontal</Text>

          <Div className='flex flex-row items-center gap-1'>
            <LucidePersonStanding
              size={18}
              className='text-neutral-500'
            />

            <Text className='text-neutral-400'>Costas</Text>
          </Div>
        </Div>
      </AppHeaderContainer>

      <AppLayout>
        <Image
          resizeMode='contain'
          className='max-h-[364px] w-full flex-1 rounded-md'
          alt='Imagem do exercício'
          src={'https://i.pinimg.com/564x/50/d5/99/50d59926c38acd2e0e157275a245fbc1.jpg'}
        />

        <Card className='mt-2 bg-neutral-800 w-full'>
          <CardHeader>
            <Div className='flex flex-row items-center justify-around gap-1'>
              <Div className='flex flex-row items-center gap-2'>
                <LucideDumbbell
                  size={20}
                  className='text-primary'
                />

                <Text>3 séries</Text>
              </Div>

              <Div className='flex flex-row items-center gap-2'>
                <LucideRepeat
                  size={20}
                  className='text-primary'
                />

                <Text>12 repetições</Text>
              </Div>
            </Div>
          </CardHeader>

          <CardContent>
            <Button>
              <Text className='font-semibold'>Marcar como realizado</Text>
            </Button>
          </CardContent>
        </Card>
      </AppLayout>
    </>
  )
}
