import type { Exercise } from '@/@types/exercise'
import { AppHeaderContainer } from '@/components/app-header-container'
import {
  LucideArrowLeft,
  LucideDumbbell,
  LucidePersonStanding,
  LucideRepeat,
} from '@/components/icons'
import { AppLayout } from '@/components/layouts/app'
import { LoadingIndicator } from '@/components/loading-indicator'
import { LoadingIndicatorScreen } from '@/components/loading-indicator-screen'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { api } from '@/lib/axios'
import type { AppNavigatorRoutesProps } from '@/routes/app.routes'
import { Div } from '@expo/html-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert, Image, TouchableOpacity } from 'react-native'

type RouteParams = {
  exerciseId: string
}

export const ExerciseScreen = () => {
  const [exerciseDetails, setExerciseDetails] = useState<Exercise | null>(null)
  const [isSubmittingToRealized, setIsSubmittingToRealized] = useState(false)

  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute()
  const { exerciseId } = params as RouteParams

  const handleMarkAsRealized = async () => {
    try {
      setIsSubmittingToRealized(true)

      await api.post('/history', {
        exercise_id: exerciseId,
      })

      Alert.alert('Parabéns! Exercício registrado no seu histórico.')

      navigate('history')
    } catch (error: any) {
      Alert.alert(
        `${
          error.response.data.message ?? 'Não foi possível registrar o exercício em seu histórico.'
        }`
      )
    } finally {
      setIsSubmittingToRealized(false)
    }
  }

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const { data: exerciseDetails } = await api.get<Exercise>(`/exercises/${exerciseId}`)

        setExerciseDetails(exerciseDetails)
      } catch (error: any) {
        Alert.alert(
          `${error.response.data.message ?? 'Não foi possível carregar os detalhes do exercício.'}`
        )
      }
    }

    fetchExerciseDetails()
  }, [exerciseId])

  if (!exerciseDetails) {
    return <LoadingIndicatorScreen />
  }

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
          <Text className='text-lg font-semibold'>{exerciseDetails.name}</Text>

          <Div className='flex flex-row items-center gap-1'>
            <LucidePersonStanding
              size={18}
              className='text-neutral-500'
            />

            <Text className='text-neutral-400'>
              {exerciseDetails.group.charAt(0).toUpperCase() + exerciseDetails.group.slice(1)}
            </Text>
          </Div>
        </Div>
      </AppHeaderContainer>

      <AppLayout>
        <Image
          resizeMode='contain'
          className='flex-1 w-full rounded-md'
          alt='Imagem do exercício'
          source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}` }}
        />

        <Card className='mt-2 bg-neutral-800 w-full'>
          <CardHeader>
            <Div className='flex flex-row items-center justify-around gap-1'>
              <Div className='flex flex-row items-center gap-2'>
                <LucideDumbbell
                  size={20}
                  className='text-primary'
                />

                <Text>{exerciseDetails.series} séries</Text>
              </Div>

              <Div className='flex flex-row items-center gap-2'>
                <LucideRepeat
                  size={20}
                  className='text-primary'
                />

                <Text>{exerciseDetails.repetitions} repetições</Text>
              </Div>
            </Div>
          </CardHeader>

          <CardContent>
            <Button
              onPress={handleMarkAsRealized}
              disabled={isSubmittingToRealized}
            >
              {isSubmittingToRealized ? (
                <LoadingIndicator />
              ) : (
                <Text className='font-semibold'>Marcar como realizado</Text>
              )}
            </Button>
          </CardContent>
        </Card>
      </AppLayout>
    </>
  )
}
