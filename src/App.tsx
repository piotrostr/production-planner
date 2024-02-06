import { Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"
import {
  Active,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  Over,
} from "@dnd-kit/core"
import { Toolbar } from "./components/Toolbar"
import { useEffect, useState } from "react"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { DataGrid } from "./components/DataGrid"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../theme"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ToggleView } from "./components/ToggleView"
import { generateMonthView } from "./generateView"

import grid, {
  GridType,
  fetchGridStart,
  initializeGrid,
  initializeGridStart,
  removeCell,
  removeCells,
  setCell,
  setCellsOccupied,
  syncGridStart,
  updateGridStart,
} from "./slices/grid"

import { stands as mockStands, tasks as mockTasks, tasks } from "./mock-data"
import { Task, syncTasksStart } from "./slices/tasks"
import { useAppDispatch, useAppSelector } from "./hooks"
import { syncFacilitiesStart } from "./slices/facilities"

export interface DraggedTask {
  draggableId: string | null
  task: Task | null
}

function App() {
  const [view, setView] = useState(generateMonthView(1000))
  const [draggedTask, setDraggedTask] = useState<DraggedTask>({
    draggableId: null,
    task: null,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(syncTasksStart())
    dispatch(syncFacilitiesStart())
    dispatch(syncGridStart())
    dispatch(
      initializeGridStart({
        rowCount: view.headerBottomData.length,
        columnCount: mockStands.length,
      })
    )
  }, [dispatch])

  const gridState = useAppSelector((state) => state.grid)
  const cellStateMap = gridState.grid

  const checkCanDrop = (over: Over, active: Active) => {
    // move this to sagas/tasks.ts, there is a helper there to check for collisions
    // it will be hard at first but once we migrate this, the logic will be clear
    // in this component
    const overId = over.id

    const task = active.data.current?.task
    const cellSpan = task.duration

    const [rowId, colId] = (overId as string).split("-")
    if (!cellStateMap) return
    for (let i = 0; i < cellSpan; i++) {
      const cellId = `${rowId}-${Number(colId) + i}`
      if (cellId in cellStateMap.cells) {
        const cell = cellStateMap.cells[cellId]
        if (task.id !== cell.taskId) {
          return false
        }
      }
    }

    return true
  }

  const handleDragEndFromSlider = (over: Over, active: Active) => {
    const cellId = over?.id as string
    const task = active.data.current?.task
    const cellSpan = task.duration
    const [rowId, colId] = cellId.split("-")
    dispatch(setCellsOccupied({ rowId, colId, taskId: task.id, cellSpan }))
  }

  const handleDragEndBetweenCells = (over: Over, active: Active) => {
    //remove task from cellStateMap
    const startCellId = over.id as string
    const task = active.data.current?.task
    const cellSpan = task.duration
    const [rowId, colId] = startCellId.split("-")
    const sourceId = active.id as string
    const [sourceRowId, sourceColId] = sourceId.split("-")
    dispatch(
      removeCells({
        rowId: sourceRowId,
        colId: sourceColId,
        cellSpan: cellSpan,
      })
    )
    dispatch(
      setCellsOccupied({
        rowId,
        colId,
        taskId: task?.id,
        cellSpan,
      })
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return
    }
    const canDrop = checkCanDrop(event.over, event.active)
    if (event.active.id !== event.over.id && canDrop) {
      if (event.active.data?.current?.source === null) {
        handleDragEndFromSlider(event.over, event.active)
      } else {
        handleDragEndBetweenCells(event.over, event.active)
      }
    }
    setDraggedTask({ draggableId: null, task: null })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedTask({
      draggableId: String(event.active.id),
      task: event.active.data?.current?.task,
    })
  }

  const handleDragCancel = () => {
    setDraggedTask({ draggableId: null, task: null })
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Stack width="100vw" height="100vh">
            <Toolbar />
            <ToggleView view={view} setView={setView} />
            <DndContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
              autoScroll={{ layoutShiftCompensation: false }}
              modifiers={[snapCenterToCursor]}
            >
              <TaskSlider />
              <DataGrid draggedTask={draggedTask} view={view} />
            </DndContext>
          </Stack>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
