import type { Exercise } from '@/@types/exercise'
import { AppLayout } from '@/components/layouts/app'
import { LoadingIndicator } from '@/components/loading-indicator'
import { Text } from '@/components/ui/text'
import { api } from '@/lib/axios'
import { theme } from '@/theme'
import { Div } from '@expo/html-elements'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { ExerciseCard } from './exercise-card'
import { ExerciseGroupItem } from './exercise-group-item'
import { HomeHeader } from './header'

export const HomeScreen = () => {
  const [exerciseGroups, setExerciseGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [activeExerciseGroupName, setActiveExerciseGroupName] = useState('')

  const [isExerciseGroupsLoading, setIsExerciseGroupsLoading] = useState(false)
  const [isExercisesLoading, setIsExercisesLoading] = useState(false)

  useEffect(() => {
    const fetchExerciseGroups = async () => {
      try {
        setIsExerciseGroupsLoading(true)

        const { data: exerciseGroupsList } = await api.get<string[]>('/groups')

        setExerciseGroups(exerciseGroupsList)
        setActiveExerciseGroupName(exerciseGroupsList[0])
      } catch (error: any) {
        Alert.alert(
          `${error.response.data.message ?? 'Não foi possível carregar os grupos de exercício.'}`
        )
      } finally {
        setIsExerciseGroupsLoading(false)
      }
    }

    fetchExerciseGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      const fetchExercises = async () => {
        try {
          setIsExercisesLoading(true)

          const { data: exercisesList } = await api.get<Exercise[]>(
            `/exercises/bygroup/${activeExerciseGroupName}`
          )

          setExercises(exercisesList)
        } catch (error: any) {
          Alert.alert(
            `${error.response.data.message ?? 'Não foi possível carregar os exercícios.'}`
          )
        } finally {
          setIsExercisesLoading(false)
        }
      }

      fetchExercises()
    }, [activeExerciseGroupName])
  )

  return (
    <>
      <HomeHeader />

      <AppLayout>
        <Div className='w-full'>
          {isExerciseGroupsLoading ? (
            <Div className='mx-auto mb-4'>
              <LoadingIndicator color={theme.colors.primary} />
            </Div>
          ) : (
            <FlatList
              data={exerciseGroups}
              className='w-full h-12 mb-10'
              horizontal
              keyExtractor={(item, index) => `${item}-${index.toString()}`}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName='flex flex-row gap-4'
              renderItem={({ item: exerciseGroup, index }) => (
                <ExerciseGroupItem
                  key={index}
                  title={exerciseGroup}
                  onPress={() => setActiveExerciseGroupName(exerciseGroup)}
                  currentActive={activeExerciseGroupName}
                />
              )}
            />
          )}
        </Div>

        <Div className=' w-full flex flex-row items-center justify-between mb-4'>
          <Text className='font-semibold text-lg'>Exercícios</Text>
          <Text>4</Text>
        </Div>

        <Div className='w-full flex flex-col gap-3 pb-10 mb-10'>
          {isExercisesLoading ? (
            <Div className='items-center mt-4 justify-center flex flex-1'>
              <LoadingIndicator
                color={theme.colors.primary}
                size={32}
              />
            </Div>
          ) : (
            <FlatList
              data={exercises}
              className='w-full mb-10'
              keyExtractor={(item, index) => `${item}-${index.toString()}`}
              contentContainerClassName='flex flex-col gap-3'
              renderItem={({ item: exercise, index }) => (
                <ExerciseCard
                  key={index}
                  exercise={exercise}
                />
              )}
            />
          )}
        </Div>
      </AppLayout>
    </>
  )
}
