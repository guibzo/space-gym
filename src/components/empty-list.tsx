import { LucideSearchX } from '@/components/icons'
import { Text } from '@/components/ui/text'
import { Div } from '@expo/html-elements'

type EmptyListProps = {
  title: string
  description: string
}

export const EmptyList = ({ title, description }: EmptyListProps) => {
  return (
    <Div className='flex-1 justify-center items-center'>
      <LucideSearchX
        className='size-8 text-primary'
        width={32}
        height={32}
      />

      <Div className='w-full items-center mt-4'>
        <Text className='text-xl font-bold'>{title}</Text>

        <Text className='text-base'>{description}</Text>
      </Div>
    </Div>
  )
}
