import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Div } from '@expo/html-elements'
import { TouchableOpacity } from 'react-native'

type ExerciseCardProps = {
  title: string
  description: string
  hour: string
}

export const ExerciseCard = ({ title, description, hour }: ExerciseCardProps) => {
  return (
    <Div className='flex flex-col gap-6'>
      <Div className='gap-y-2'>
        <Card className='bg-neutral-800 p-4 w-full flex justify-between flex-row items-center gap'>
          <Div className='flex flex-col gap-1'>
            <Text className='font-semibold'>{title}</Text>
            <Text className='text-neutral-300 text-lg'>{description}</Text>
          </Div>

          <TouchableOpacity>
            <Text className='text-neutral-500'>{hour}</Text>
          </TouchableOpacity>
        </Card>
      </Div>
    </Div>
  )
}
