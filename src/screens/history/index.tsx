import type { HistoryWithDay } from '@/@types/history'
import { AppHeaderContainer } from '@/components/app-header-container'
import { EmptyList } from '@/components/empty-list'
import { AppLayout } from '@/components/layouts/app'
import { LoadingIndicatorScreen } from '@/components/loading-indicator-screen'
import { Text } from '@/components/ui/text'
import { api } from '@/lib/axios'
import { cn } from '@/utils/cn'
import { Div, H3 } from '@expo/html-elements'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Alert, SectionList } from 'react-native'
import { HistoryItem } from './history-item'

export const HistoryScreen = () => {
  const [historyList, setHistoryList] = useState<HistoryWithDay[]>([])

  const fetchHistory = async () => {
    try {
      const { data: history } = await api.get<HistoryWithDay[]>('/history')

      setHistoryList(history)
    } catch (error: any) {
      Alert.alert(
        `${error.response.data.message ?? 'Não foi carregar seu histórico de exercícios.'}`
      )
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  if (!historyList || historyList.length === 0) {
    return <LoadingIndicatorScreen />
  }

  return (
    <>
      <AppHeaderContainer>
        <Div className='flex w-full items-center justify-center'>
          <H3 className='font-semibold text-neutral-100'>Histórico de Exercícios</H3>
        </Div>
      </AppHeaderContainer>

      <AppLayout>
        <SectionList
          sections={historyList}
          className='w-full'
          keyExtractor={(item) => item.id}
          contentContainerClassName={cn(
            'flex flex-col gap-3',
            historyList.length === 0 && 'flex-1 items-center justify-center'
          )}
          renderItem={({ item: historyItem }) => (
            <HistoryItem
              key={historyItem.id}
              exerciseGroup={historyItem.group}
              exerciseName={historyItem.name}
              exerciseHour={historyItem.hour}
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
