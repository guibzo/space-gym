import { LucideCircleUserRound, LucideHistory, LucideHome } from '@/components/icons'
import { ExerciseScreen } from '@/screens/exercise'
import { HistoryScreen } from '@/screens/history'
import { HomeScreen } from '@/screens/home'
import { ProfileScreen } from '@/screens/profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Platform } from 'react-native'
import { theme } from 'theme'

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Screen, Navigator } = createBottomTabNavigator<AppRoutes>()

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.neutral[500],
        tabBarStyle: {
          backgroundColor: theme.colors.neutral[800],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: 32,
          paddingTop: 32,
        },
      }}
      initialRouteName='home'
    >
      <Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <LucideHome
              color={color}
              className='size-6'
              accessibilityLabel='Ir para o início'
            />
          ),
        }}
      />

      <Screen
        name='history'
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <LucideHistory
              color={color}
              className='size-6'
              accessibilityLabel='Acessar Histórico'
            />
          ),
        }}
      />

      <Screen
        name='profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <LucideCircleUserRound
              color={color}
              className='size-6'
              accessibilityLabel='Acessar Perfil'
            />
          ),
        }}
      />

      <Screen
        name='exercise'
        component={ExerciseScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}
