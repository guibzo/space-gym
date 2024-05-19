import { AppHeaderContainer } from '@/components/app-header-container'
import { EmptyList } from '@/components/empty-list'
import { AppLayout } from '@/components/layouts/app'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils/cn'
import { Div, H3 } from '@expo/html-elements'
import { SectionList } from 'react-native'
import { ExerciseCard } from './exercise-card'

const exercises = [
  {
    title: '26.08.2023',
    data: [
      {
        title: 'Costas',
        hour: '08:32',
        description: 'Puxada frontal',
      },
      {
        title: 'Costas',
        hour: '08:32',
        description: 'Puxada frontal',
      },
    ],
  },
  {
    title: '27.08.2023',
    data: [
      {
        title: 'Costas',
        hour: '09:50',
        description: 'Remada unilateral',
      },
    ],
  },
]

export const HistoryScreen = () => {
  return (
    <>
      <AppHeaderContainer>
        <Div className='flex w-full items-center justify-center'>
          <H3 className='font-semibold text-neutral-100'>Histórico de Exercícios</H3>
        </Div>
      </AppHeaderContainer>

      <AppLayout>
        <SectionList
          sections={exercises}
          className='w-full mb-10'
          keyExtractor={(_, index) => index.toString()}
          contentContainerClassName={cn(
            'flex flex-col gap-3',
            exercises.length === 0 && 'flex-1 items-center justify-center'
          )}
          renderItem={({ item: exercise, index }) => (
            <ExerciseCard
              key={index}
              title={exercise.title}
              description={exercise.description}
              hour={exercise.hour}
            />
          )}
          renderSectionHeader={({ section: { title: date } }) => <Text>{date}</Text>}
          ListEmptyComponent={() => (
            <EmptyList
              title='Nada para exibir em seu histórico...'
              description='Que tal realizar o primeiro exercício?'
            />
          )}
        />
      </AppLayout>
    </>
  )
}
