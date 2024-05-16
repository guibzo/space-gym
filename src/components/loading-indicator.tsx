import { Div } from '@expo/html-elements'
import { ActivityIndicator } from 'react-native'

export const LoadingIndicator = () => {
  return (
    <Div className='flex-1 justify-center items-center bg-neutral-900'>
      <ActivityIndicator color='#fafafa' />
    </Div>
  )
}
