import { AppLayout } from '@/components/layouts/app'
import { Div } from '@expo/html-elements'

import { LoadingIndicator } from '@/components/loading-indicator'

export const LoadingIndicatorScreen = () => {
  return (
    <AppLayout>
      <Div className='flex-1 justify-center items-center'>
        <LoadingIndicator />
      </Div>
    </AppLayout>
  )
}
