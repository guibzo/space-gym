import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    height: 150,
    color: theme.colors.neutral[100],
    backgroundColor: theme.colors.neutral[800],
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
})
