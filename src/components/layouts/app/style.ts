import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1,
    color: theme.colors.neutral[100],
    backgroundColor: theme.colors.neutral[900],
    paddingBottom: 44,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
})
