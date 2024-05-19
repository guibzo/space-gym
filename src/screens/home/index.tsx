import { AppHeaderContainer } from '@/components/app-header-container'
import { LucideLogOut, LucideUser } from '@/components/icons'
import { AppLayout } from '@/components/layouts/app'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/components/ui/text'
import { Div, Span, Strong } from '@expo/html-elements'
import { useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { ExerciseCard } from './exercise-card'
import { ExerciseGroupItem } from './exercise-group-item'

const exercisesGroups = ['Costas', 'Bíceps', 'Tríceps', 'Ombro']
const exercises = [
  {
    title: 'Puxada frontal',
    description: '3 séries x 12 repetições',
    imageUri: 'https://i.pinimg.com/564x/50/d5/99/50d59926c38acd2e0e157275a245fbc1.jpg',
  },
  {
    title: 'Remada curva',
    description: '3 séries x 12 repetições',
    imageUri: 'https://i.pinimg.com/564x/bb/79/09/bb7909ca0e18f79828a3240e57115cca.jpg',
  },
  {
    title: 'Remada unilateral',
    description: '3 séries x 12 repetições',
    imageUri: 'https://i.pinimg.com/564x/22/72/c9/2272c96968bcf39599ee619f96b61209.jpg',
  },
  {
    title: 'Levantamento terra',
    description: '3 séries x 12 repetições',
    imageUri: 'https://i.pinimg.com/564x/51/2d/30/512d30073ab03722499db544927068c3.jpg',
  },
]

export const HomeScreen = () => {
  const [activeExercisesGroupItemName, setActiveExercisesGroupItemName] = useState('Costas')

  return (
    <>
      <AppHeaderContainer>
        <Div className='flex flex-row w-full justify-between items-center'>
          <Div className='flex flex-row gap-4 items-center'>
            <Avatar
              className='size-16'
              alt="Zach Nugent's Avatar"
            >
              <AvatarImage source={{ uri: 'https://github.com/xbozo.png' }} />
              <AvatarFallback>
                <LucideUser className='w-8 h-8 text-neutral-400' />
              </AvatarFallback>
            </Avatar>

            <Div className='flex'>
              <Span className='text-neutral-100'>Olá,</Span>
              <Strong className='text-neutral-100 '>Guilherme Viana</Strong>
            </Div>
          </Div>

          <TouchableOpacity>
            <LucideLogOut
              accessibilityLabel='Sair'
              className='size-5 text-neutral-200'
            />
          </TouchableOpacity>
        </Div>
      </AppHeaderContainer>

      <AppLayout>
        <Div className='w-full'>
          <FlatList
            data={exercisesGroups}
            className='w-full h-12 mb-10'
            horizontal
            keyExtractor={(item, index) => `${item}-${index.toString()}`}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName='flex flex-row gap-4'
            renderItem={({ item: exerciseGroup, index }) => (
              <ExerciseGroupItem
                key={index}
                title={exerciseGroup}
                onPress={() => setActiveExercisesGroupItemName(exerciseGroup)}
                currentActive={activeExercisesGroupItemName}
              />
            )}
          />
        </Div>

        <Div className=' w-full flex flex-row items-center justify-between mb-4'>
          <Text className='font-semibold text-lg'>Exercícios</Text>
          <Text>4</Text>
        </Div>

        <Div className='w-full flex flex-col gap-3 pb-10 mb-10'>
          <FlatList
            data={exercises}
            className='w-full mb-10'
            keyExtractor={(item, index) => `${item}-${index.toString()}`}
            contentContainerClassName='flex flex-col gap-3'
            renderItem={({ item: exercise, index }) => (
              <ExerciseCard
                key={index}
                description={exercise.description}
                title={exercise.title}
                imageUri={exercise.imageUri}
              />
            )}
          />
        </Div>
      </AppLayout>
    </>
  )
}
