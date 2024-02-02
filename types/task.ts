import { UUID } from "../types"

export interface Task {
  id: UUID
  title: string
  description: string
  bgcolor: string
  duration: number
  requiredTasks: UUID[]
}
