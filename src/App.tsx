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
  fetchGridStart,
  initializeGrid,
  removeCell,
  setCell,
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
    dispatch(
      initializeGrid({
        rowCount: view.headerBottomData.length,
        columnCount: mockStands.length,
      })
    )
  }, [dispatch])

  const gridState = useAppSelector((state) => state.grid)
  const cellStateMap = gridState.grid

  if (gridState.loading) {
    return <div>Loading...</div>
  }

  const checkCanDrop = (over: Over, active: Active) => {
    // move this to sagas/tasks.ts, there is a helper there to check for collisions
    // it will be hard at first but once we migrate this, the logic will be clear
    // in this component
    const overId = over.id
    const task = active.data.current?.task
    const cellSpan = task.duration
    const [x, y] = (overId as string).split("-").map((n: string) => Number(n))
    if (!cellStateMap) return
    for (let i = 0; i < cellSpan; i++) {
      const cellId = `${x}-${y + i}`
      if (cellId in cellStateMap.cells) {
        const cell = cellStateMap.cells[cellId]
        if (cell.state !== "empty" && task.id !== cell.taskId) {
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
    const rowId = cellId.split("-")[0]
    const colId = cellId.split("-")[1]
    console.log(rowId, colId, cellSpan)

    dispatch(
      setCell({
        cellId: cellId,
        cell: {
          state: "occupied-start",
          source: cellId,
          taskId: task.id,
        },
      })
    )
    if (cellSpan > 1) {
      for (let i = 1; i < cellSpan - 1; i++) {
        dispatch(
          setCell({
            cellId: `${rowId}-${Number(colId) + i}`,
            cell: {
              state: "occupied",
              source: cellId,
              taskId: task.id,
            },
          })
        )
      }
      dispatch(
        setCell({
          cellId: `${rowId}-${Number(colId) + cellSpan - 1}`,
          cell: {
            state: "occupied-end",
            source: cellId,
            taskId: task.id,
          },
        })
      )
    }
  }
  console.log(cellStateMap)
  const handleDragEndBetweenCells = (over: Over, active: Active) => {
    //remove task from cellStateMap
    const startCellId = over?.id as string
    const task = active.data.current?.task
    const cellSpan = task.duration
    const sourceId = active.data.current?.source as string
    const [x, y] = sourceId.split("-").map((n: string) => Number(n))

    if (cellSpan > 1) {
      for (let i = 1; i <= cellSpan - 1; i++) {
        dispatch(
          removeCell({
            cellId: `${x}-${y + i}`,
          })
        )
      }
    }

    dispatch(
      setCell({
        cellId: startCellId,
        cell: {
          state: "occupied-start",
          source: startCellId,
          taskId: task.id,
        },
      })
    )
    if (cellSpan > 1) {
      for (let i = 1; i < cellSpan - 1; i++) {
        const midCellId = `${startCellId.split("-")[0]}-${
          Number(startCellId.split("-")[1]) + i
        }`
        dispatch(
          setCell({
            cellId: midCellId,
            cell: {
              state: "occupied",
              source: startCellId,
              taskId: task.id,
            },
          })
        )
        const endCellId = `${startCellId.split("-")[0]}-${
          Number(startCellId.split("-")[1]) + cellSpan - 1
        }`
        dispatch(
          setCell({
            cellId: endCellId,
            cell: {
              state: "occupied-end",
              source: startCellId,
              taskId: task.id,
            },
          })
        )
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return
    }
    const canDrop = checkCanDrop(event.over, event.active)
    if (event.active.id !== event.over.id && canDrop) {
      //if task is in the task array)
      if (event.active.data?.current?.source === null) {
        handleDragEndFromSlider(event.over, event.active)
      } else {
        handleDragEndBetweenCells(event.over, event.active)
      }
    }
    setDraggedTask({ draggableId: null, task: null })
  }

  const handleDragStart = (event: DragStartEvent) => {
    if (!event.active.data?.current?.task) {
      return
    }
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
