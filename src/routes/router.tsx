import { Div } from '@expo/html-elements'
import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'

export const Router = () => {
  return (
    <Div className='flex-1 bg-neutral-900'>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Div>
  )
}
