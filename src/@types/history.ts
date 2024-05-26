export type HistoryData = {
  created_at: string
  exercise_id: string
  group: string
  hour: string
  id: string
  name: string
  user_id: string
}

export type HistoryWithDay = {
  title: string
  data: HistoryData[]
}
