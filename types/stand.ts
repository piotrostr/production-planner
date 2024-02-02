import { UUID } from "../types"

export interface Stand {
  id: number
  name: string
  locationId: UUID
  activityId: UUID
  manpower: number
  description: string
  bgcolor: string
}
