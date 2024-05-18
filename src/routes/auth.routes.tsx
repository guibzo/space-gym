import { SignInScreen } from '@/screens/sign-in'
import { SignUpScreen } from '@/screens/sign-up'
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack'

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Screen, Navigator } = createNativeStackNavigator<AuthRoutes>()

export const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='signIn'
    >
      <Screen
        name='signIn'
        component={SignInScreen}
      />

      <Screen
        name='signUp'
        component={SignUpScreen}
      />
    </Navigator>
  )
}
