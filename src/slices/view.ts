import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GridType } from "./grid"

// Define the Facility interface
export interface View {
  name: string
  headerTopData: Array<string>
  headerBottomData: Array<{
    field: string
    headerName: string
    date: number
    editable: boolean
    sortable: boolean
    width: number
    minWidth: number
  }>
  cells?: {
    [key: string]: {
      state: string
      source?: string
      tasks: Array<{
        taskId: string
        left?: number
        width?: number
      }>
    }
  }
  cellWidth: number
}

// Define the state structure for facilities
interface ViewState {
  view: View | null
  loading: boolean
  error: string | null
}

// Initial state for the facilities slice
const initialState: ViewState = {
  view: null,
  loading: false,
  error: null,
}

// Create the facilities slice
export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setMonthView: (
      state,
      action: PayloadAction<{ view: View; grid: GridType }>
    ) => {
      state.view = action.payload.view
      state.view.cells = action.payload.grid.cells
    },
    setQuarterView: (
      state,
      action: PayloadAction<{ view: View; grid: GridType }>
    ) => {
      state.view = action.payload.view
      state.view.cells = action.payload.grid.cells
    },
    setYearView: (
      state,
      action: PayloadAction<{ view: View; grid: GridType }>
    ) => {
      state.view = action.payload.view
      state.view.cells = action.payload.grid.cells
    },
  },
})

// Export the actions
export const { setMonthView } = viewSlice.actions

// Export the reducer
export default viewSlice.reducer
