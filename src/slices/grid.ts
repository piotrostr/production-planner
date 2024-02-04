import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Cell {
  state: string;
  taskID: string;
  source: string;
}

export interface GridState {
  cells: {
    [key: string]: Cell;
  };
  columnCount?: number;
  rowCount?: number;
}

export interface State {
  [key: string]: Cell;
}

const initialState: GridState = {
  cells: {},
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    // Action to add or update a cell in the grid
    setCell: (state, action: PayloadAction<{ cellId: string; cell: Cell }>) => {
      const { cellId, cell } = action.payload;
      state.cells[cellId] = cell;
    },

    // Action to initialize the grid with a predefined size
    initializeGrid: (
      state,
      action: PayloadAction<{ rowCount: number; columnCount: number }>
    ) => {
      state.rowCount = action.payload.rowCount;
      state.columnCount = action.payload.columnCount;
      // Optionally, you can also initialize the `cells` object with default cells here
    },

    // Action to remove a cell from the grid (if necessary)
    removeCell: (state, action: PayloadAction<{ cellId: string }>) => {
      delete state.cells[action.payload.cellId];
    },

    // More reducers can be added as needed
  },
});

export const { setCell, initializeGrid, removeCell } = gridSlice.actions;

// Default export the reducer
export default gridSlice.reducer;
