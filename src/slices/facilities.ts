import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the Facility interface
export interface Facility {
  id: string
  title: string
  description: string
  bgcolor: string
  tasks: string[] // Array of task IDs
}

// Define the state structure for facilities
interface FacilitiesState {
  facilities: {
    [id: string]: Facility
  }
  loading: boolean
  error: string | null
}

// Initial state for the facilities slice
const initialState: FacilitiesState = {
  facilities: {},
  loading: false,
  error: null,
}

// Create the facilities slice
export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    // Action to add or update a facility
    upsertFacility: (state, action: PayloadAction<Facility>) => {
      const facility = action.payload
      // Initialize tasks array if not provided
      if (!facility.tasks) facility.tasks = []
      state.facilities[facility.id] = facility
    },
    // Action to remove a facility by its ID
    removeFacility: (state, action: PayloadAction<string>) => {
      delete state.facilities[action.payload]
    },
    // Action to assign a task to a facility
    assignTaskToFacility: (
      state,
      action: PayloadAction<{ facilityId: string; taskId: string }>
    ) => {
      const { facilityId, taskId } = action.payload
      const facility = state.facilities[facilityId]
      if (facility && !facility.tasks.includes(taskId)) {
        facility.tasks.push(taskId)
      }
    },
    // Action to remove a task from a facility
    removeTaskFromFacility: (
      state,
      action: PayloadAction<{ facilityId: string; taskId: string }>
    ) => {
      const { facilityId, taskId } = action.payload
      const facility = state.facilities[facilityId]
      if (facility) {
        facility.tasks = facility.tasks.filter((id) => id !== taskId)
      }
    },
    setFacilities(state, action: PayloadAction<{ [id: string]: Facility }>) {
      state.facilities = action.payload
      state.loading = false
    },
    fetchFacilitiesStart(state) {
      state.loading = true
      state.error = null
    },
    // Triggered when fetching or updating the grid fails
    taskOperationFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    // Triggered to start the grid update process
    updateFacilitiesStart(state /*action: PayloadAction<GridType>*/) {
      state.loading = true
      state.error = null
    },
    deleteFacilityStart(state /*action: PayloadAction<GridType>*/) {
      state.loading = true
      state.error = null
    },
    syncFacilitiyStart(state /*action: PayloadAction<GridType>*/) {
      state.loading = true
      state.error = null
    },
  },
})

// Export the actions
export const {
  upsertFacility,
  removeFacility,
  assignTaskToFacility,
  removeTaskFromFacility,
  setFacilities,
  fetchFacilitiesStart,
  taskOperationFailed,
  updateFacilitiesStart,
  deleteFacilityStart,
  syncFacilitiyStart,
} = facilitiesSlice.actions

// Export the reducer
export default facilitiesSlice.reducer
