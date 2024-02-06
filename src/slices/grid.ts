import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Cell {
  state: string
  taskId: string
  source: string
}

// TODO move to types, clean up types
export interface GridType {
  cells: {
    [key: string]: Cell
  }
  columnCount?: number
  rowCount?: number
}

interface GridState {
  grid: GridType | null
  loading: boolean
  error: string | null
}

const initialState: GridState = {
  grid: null,
  loading: false,
  error: null,
}

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    // Action to initialize the grid with a predefined size
    initializeGrid: (
      state,
      action: PayloadAction<{ rowCount: number; columnCount: number }>
    ) => {
      if (!state.grid) {
        state.grid = {
          cells: {},
        }
      }
      state.grid.rowCount = action.payload.rowCount
      state.grid.columnCount = action.payload.columnCount
    },
    setCell: (state, action: PayloadAction<{ cellId: string; cell: Cell }>) => {
      const { cellId, cell } = action.payload
      if (!state.grid) {
        state.grid = {
          cells: {},
        }
      }
      state.grid.cells[cellId] = cell
    },
    setCellsOccupied: (
      state,
      action: PayloadAction<{
        rowId: string
        colId: string
        taskId: string
        cellSpan: string
      }>
    ) => {
      const { rowId, colId, taskId, cellSpan } = action.payload
      const duration = Number(cellSpan)
      const colIdx = Number(colId)
      const cellId = `${rowId}-${colIdx}`
      if (!state.grid) {
        state.grid = {
          cells: {},
        }
      }
      state.grid.cells[cellId] = {
        state: "occupied-start",
        taskId: taskId,
        source: cellId,
      }
      if (duration > 1) {
        for (let i = 1; i < duration - 1; i++) {
          state.grid.cells[`${rowId}-${colIdx + i}`] = {
            state: "occupied",
            taskId: taskId,
            source: cellId,
          }
        }
        state.grid.cells[`${rowId}-${colIdx + duration - 1}`] = {
          state: "occupied-end",
          taskId: taskId,
          source: cellId,
        }
      }
    },

    removeCell: (state, action: PayloadAction<{ cellId: string }>) => {
      if (!state.grid) {
        return
      }
      delete state.grid.cells[action.payload.cellId]
    },
    removeCells: (
      state,
      action: PayloadAction<{ rowId: string; colId: string; cellSpan: number }>
    ) => {
      const { rowId, colId, cellSpan } = action.payload
      if (!state.grid) {
        return
      }
      for (let i = 0; i <= cellSpan - 1; i++) {
        delete state.grid.cells[`${rowId}-${Number(colId) + i}`]
      }
    },
    // Triggered when the grid fetch starts
    fetchGridStart(state) {
      state.loading = true
      state.error = null
    },
    // Triggered when the grid data is successfully fetched or updated
    setGrid(state, action: PayloadAction<GridType>) {
      state.grid = action.payload
      state.loading = false
    },
    // Triggered when fetching or updating the grid fails
    gridOperationFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    // Triggered to start the grid update process
    updateGridStart(state, action: PayloadAction<GridType>) {
      state.loading = true
      state.error = null
    },
    initializeGridStart(
      state,
      action: PayloadAction<{ rowCount: number; columnCount: number }>
    ) {
      state.loading = true
      state.error = null
    },
    syncGridStart(state) {
      state.loading = true
      state.error = null
    },
  },
})

export const {
  fetchGridStart,
  setGrid,
  gridOperationFailed,
  updateGridStart,
  initializeGrid,
  removeCell,
  removeCells,
  setCell,
  setCellsOccupied,
  initializeGridStart,
  syncGridStart,
} = gridSlice.actions

// Default export the reducer
export default gridSlice.reducer
