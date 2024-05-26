import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Div } from '@expo/html-elements'
import { TouchableOpacity } from 'react-native'

type HistoryItemProps = {
  exerciseGroup: string
  exerciseName: string
  exerciseHour: string
}

export const HistoryItem = ({ exerciseGroup, exerciseName, exerciseHour }: HistoryItemProps) => {
  const groupWithInitialCapitalized = exerciseGroup.charAt(0).toUpperCase() + exerciseGroup.slice(1)

  return (
    <Div className='flex flex-col gap-6'>
      <Div className='gap-y-2'>
        <Card className='bg-neutral-800 p-4 w-full flex justify-between flex-row items-center gap'>
          <Div className='flex flex-col gap-1'>
            <Text className='font-semibold'>{groupWithInitialCapitalized}</Text>
            <Text className='text-neutral-300 text-lg'>{exerciseName}</Text>
          </Div>

          <TouchableOpacity>
            <Text className='text-neutral-500'>{exerciseHour}</Text>
          </TouchableOpacity>
        </Card>
      </Div>
    </Div>
  )
}
