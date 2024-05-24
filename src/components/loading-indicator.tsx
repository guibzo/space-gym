import { LucideLoaderCircle } from '@/components/icons'
import { theme } from '@/theme'

export const LoadingIndicator = ({ color, size }: { color?: string; size?: number }) => {
  const { colors } = theme

  return (
    <LucideLoaderCircle
      className='animate-spin'
      color={color ?? colors.neutral[100]}
      size={size ?? 20}
    />
  )
}
