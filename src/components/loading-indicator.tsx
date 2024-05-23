import { theme } from '@/theme'
import { ActivityIndicator } from 'react-native'

export const LoadingIndicator = () => {
  const { colors } = theme

  return (
    <ActivityIndicator
      color={colors.primary}
      size={32}
    />
  )
}
