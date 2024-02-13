import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DragState {
  disabled: boolean
}

const initialState: DragState = {
  disabled: false,
}

export const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    setDragDisabled: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload
    },
  },
})

// Export the actions
export const { setDragDisabled } = dragSlice.actions

// Export the reducer
export default dragSlice.reducer
