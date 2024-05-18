import { Text } from '@/components/ui/text'
import { cn } from '@/utils/cn'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ExerciseGroupItemProps = TouchableOpacityProps & {
  title: string
  currentActive: string
}

export const ExerciseGroupItem = ({ title, currentActive, ...props }: ExerciseGroupItemProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn(
        'border-transparent border rounded-md px-6 flex items-center justify-center bg-neutral-800',
        title === currentActive && 'border-primary'
      )}
    >
      <Text className={cn('text-foreground', title === currentActive && 'text-primary font-bold')}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
