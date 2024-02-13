import { Alert, Snackbar, Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"
import {
  Active,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  Over,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core"
import { Toolbar } from "./components/Toolbar"
import { useEffect, useState } from "react"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { DataGrid } from "./components/DataGrid"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../theme"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { generateMonthView } from "./generateView"

import {
  initializeGridStart,
  removeCells,
  setCellsOccupied,
  syncGridStart,
  updateGridStart,
} from "./slices/grid"

import { Task, setTaskDroppedStart, syncTasksStart } from "./slices/tasks"
import { useAppDispatch, useAppSelector } from "./hooks"
import { syncFacilitiesStart } from "./slices/facilities"
import { setToastClose, setToastOpen } from "./slices/toast"
import { setMonthView } from "./slices/view"
import { TimelineToolbar } from "./components/TimelineToolbar"
import { syncDeadlinesStart } from "./slices/deadlines"

export interface DraggedTask {
  draggableId: string | null
  task: Task | null
}

function App() {
  const [isGridUpdated, setIsGridUpdated] = useState(false)
  const [draggedTask, setDraggedTask] = useState<DraggedTask>({
    draggableId: null,
    task: null,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(syncTasksStart())
    dispatch(syncFacilitiesStart())
    dispatch(syncGridStart())
    dispatch(syncDeadlinesStart())
    dispatch(initializeGridStart())
  }, [dispatch])

  const toastState = useAppSelector((state) => state.toast)
  const gridState = useAppSelector((state) => state.grid)
  const cellStateMap = gridState.grid

  useEffect(() => {
    if (cellStateMap) {
      dispatch(
        setMonthView({ view: generateMonthView(1000), grid: cellStateMap })
      )
    }
  }, [dispatch, gridState.grid])

  useEffect(() => {
    if (isGridUpdated && gridState.grid) {
      dispatch(updateGridStart(gridState.grid))
      setIsGridUpdated(false)
    }
  }, [isGridUpdated, dispatch, gridState.grid])

  const checkCanDrop = (over: Over, active: Active) => {
    const overId = over.id
    const task = active.data.current?.task
    const cellSpan = task.duration

    const [rowId, colId] = (overId as string).split("-")
    if (!cellStateMap) return
    const increment = 1000 * 60 * 60 * 24
    for (let i = 0; i < cellSpan * increment; i += increment) {
      const cellId = `${rowId}-${Number(colId) + i}`
      if (cellId in cellStateMap.cells) {
        const cell = cellStateMap.cells[cellId]
        if (Object.keys(cell.tasks).some((tid) => tid !== task.id)) {
          dispatch(
            setToastOpen({
              message: "Wykryto kolizję",
              severity: "error",
            })
          )
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
    dispatch(
      setTaskDroppedStart({
        taskId: task.id,
        dropped: true,
        rowId,
        colId: Number(colId),
        cellSpan,
      })
    )
    setIsGridUpdated(true)
  }

  const handleDragEndBetweenCells = (over: Over, active: Active) => {
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
    setIsGridUpdated(true)
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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  })

  const sensors = useSensors(mouseSensor)

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Stack width="100vw" height="100vh">
            <Toolbar />
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
              autoScroll={{ layoutShiftCompensation: false }}
              modifiers={[snapCenterToCursor]}
            >
              <TaskSlider />
              <TimelineToolbar />
              <DataGrid draggedTask={draggedTask} />
            </DndContext>
            <Snackbar
              open={toastState.open}
              autoHideDuration={6000}
              onClose={() => dispatch(setToastClose())}
            >
              <Alert severity={toastState.severity}>{toastState.message}</Alert>
            </Snackbar>
          </Stack>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
