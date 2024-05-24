import { AppLayout } from '@/components/layouts/app'
import { Div } from '@expo/html-elements'

import { theme } from '@/theme'
import { ActivityIndicator } from 'react-native'

export const LoadingIndicatorScreen = () => {
  const { colors } = theme

  return (
    <AppLayout>
      <Div className='flex-1 justify-center items-center'>
        <ActivityIndicator
          color={colors.primary}
          size={32}
        />
      </Div>
    </AppLayout>
  )
}
