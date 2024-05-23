import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1,
    color: theme.colors.neutral[100],
    paddingVertical: 24,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
