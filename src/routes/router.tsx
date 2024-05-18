import { Div } from '@expo/html-elements'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'

export const Router = () => {
  return (
    <Div className='flex-1 bg-neutral-900'>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Div>
  )
}
