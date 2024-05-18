import { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
}
