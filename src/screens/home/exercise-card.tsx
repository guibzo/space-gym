import type { Exercise } from '@/@types/exercise'
import { LucideChevronRight } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { api } from '@/lib/axios'
import type { AppNavigatorRoutesProps } from '@/routes/app.routes'
import { Div } from '@expo/html-elements'
import { useNavigation } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native'

type ExerciseCardProps = {
  exercise: Exercise
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  return (
    <TouchableOpacity onPress={() => navigate('exercise')}>
      <Card className='bg-neutral-800 p-2 w-full flex justify-between flex-row items-center gap-2'>
        <Div className='flex flex-row gap-4 items-center'>
          <Image
            source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}` }}
            alt={exercise.name}
            className='size-16 rounded-md'
          />

          <Div>
            <Text className='font-semibold text-lg'>{exercise.name}</Text>
            <Text className='text-neutral-400'>
              {exercise.series} séries x {exercise.repetitions} repetições
            </Text>
          </Div>
        </Div>

        <TouchableOpacity>
          <LucideChevronRight className='size-6 text-neutral-400' />
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  )
}
