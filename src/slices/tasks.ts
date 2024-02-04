import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  bgcolor: string; // Background color
  duration: number;
  dropped: boolean; // Indicates if the task has been placed on the grid
  facilityId?: number; // Optional field to link a task to a facility
}

// Define the state structure for tasks
interface TasksState {
  tasks: {
    [id: number]: Task;
  };
}

// Initial state for the tasks slice
const initialState: TasksState = {
  tasks: {},
};

// Create the tasks slice
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Action to add or update a task
    upsertTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
    },
    // Action to remove a task by its ID
    removeTask: (state, action: PayloadAction<number>) => {
      delete state.tasks[action.payload];
    },
    // You can add more actions here as needed, for example, to mark a task as dropped
    setTaskDropped: (
      state,
      action: PayloadAction<{ id: number; dropped: boolean }>
    ) => {
      const { id, dropped } = action.payload;
      const task = state.tasks[id];
      if (task) {
        task.dropped = dropped;
      }
    },
  },
});

// Export the actions
export const { upsertTask, removeTask, setTaskDropped } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;
