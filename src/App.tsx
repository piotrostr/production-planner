import { Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"
import { Active, DndContext, Over } from "@dnd-kit/core"
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

const tasksArr = [
  {
    id: 1,
    title: "PP1A",
    description: "Description 1",
    bgcolor: "#D5009A",
    duration: 4,
    dropped: false,
  },
  {
    id: 2,
    title: "PP1B",
    description: "Description 2",
    bgcolor: "#D5009A",
    duration: 10,
    dropped: false,
  },
  {
    id: 3,
    title: "PP2A",
    description: "Description 3",
    bgcolor: "#00A2D5",
    duration: 12,
    dropped: false,
  },
  {
    id: 4,
    title: "PP2B",
    description: "Description 4",
    bgcolor: "#00A2D5",
    duration: 7,
    dropped: false,
  },
  {
    id: 5,
    title: "PP3A",
    description: "Description 1",
    bgcolor: "#04D500",
    duration: 18,
    dropped: false,
  },
  {
    id: 6,
    title: "PP3B",
    description: "Description 2",
    bgcolor: "#04D500",
    duration: 11,
    dropped: false,
  },
  {
    id: 7,
    title: "PP3C",
    description: "Description 3",
    bgcolor: "#04D500",
    duration: 7,
    dropped: false,
  },
  {
    id: 8,
    title: "PP4A",
    description: "Description 4",
    bgcolor: "#9100D5",
    duration: 46,
    dropped: false,
  },
  {
    id: 9,
    title: "PP5A",
    description: "Description 4",
    bgcolor: "#D5CD00",
    duration: 25,
    dropped: false,
  },
  {
    id: 10,
    title: "PP5B",
    description: "Description 4",
    bgcolor: "#D5CD00",
    duration: 9,
    dropped: false,
  },
  {
    id: 11,
    title: "PP5C",
    description: "Description 4",
    bgcolor: "#D5CD00",
    duration: 4,
    dropped: false,
  },
]

const stands = [
  {
    id: 1,
    title: "BOP GDANSK SPAW 1",
    description: "Description 1",
    bgcolor: "#F2FFA4",
  },
  {
    id: 2,
    title: "BOP GDANSK PREFAB 1",
    description: "Description 2",
    bgcolor: "#FF9E9E",
  },
  {
    id: 3,
    title: "BOP GDANSK MAL 1",
    description: "Description 4",
    bgcolor: "#C598FF",
  },
  {
    id: 4,
    title: "BOP GDANSK MAL 2",
    description: "Description 4",
    bgcolor: "#C598FF",
  },
  {
    id: 5,
    title: "BOP GDYNIA SPAW 1",
    description: "Description 3",
    bgcolor: "#B3FFCD",
  },
  {
    id: 6,
    title: "BOP GDYNIA SPAW 2",
    description: "Description 4",
    bgcolor: "#B3FFCD",
  },
  {
    id: 7,
    title: "BOP GDYNIA PREFAB 1",
    description: "Description 4",
    bgcolor: "#9FD1FF",
  },
]

function App() {
  const [cellStateMap, setCellStateMap] = useState<any>(null)
  const [tasks, setTasks] = useState(tasksArr)
  const [view, setView] = useState(generateMonthView(1000))
  const [draggedTask, setDraggedTask] = useState({
    draggableId: null,
    task: null,
  })

  useEffect(() => {
    const initializeCellStateMap = () => {
      const stateMap = {} as any
      const rowCount = stands.length + 1
      const columnCount = view.headerBottomData.length
      for (let i = 1; i < rowCount; i++) {
        for (let j = 1; j < columnCount; j++) {
          stateMap[`${i}-${j}`] = {
            state: "empty",
            task: null,
            source: null,
          }
        }
      }
      setCellStateMap(stateMap)
    }
    initializeCellStateMap()
  }, [])

  const checkCanDrop = (over: Over, active: Active) => {
    const overId = over.id
    const task = active.data.current?.task
    const cellSpan = task.duration
    const [x, y] = (overId as string).split("-").map((n: string) => Number(n))
    const droppedCells = []
    for (let i = 0; i < cellSpan; i++) {
      const cellId = `${x}-${y + i}`
      droppedCells.push(cellStateMap[cellId])
    }
    const canDrop = !droppedCells.some(
      (cell) => cell.state !== "empty" && task.id !== cell.task.id
    )

    return canDrop
  }

  const handleDragEndFromSlider = (over: Over, active: Active) => {
    const overId = over?.id as string
    const task = active.data.current?.task
    const cellSpan = task.duration
    const [x, y] = overId.split("-").map((n: string) => Number(n))
    setTasks((prev: any) => {
      const newTasks = prev.filter((t: any) => t.id !== task.id)
      return newTasks
    })
    setCellStateMap((prev: any) => {
      const newStateMap = { ...prev }
      newStateMap[overId] = {
        state: "occupied-start",
        source: overId,
        task,
      }
      if (cellSpan > 1) {
        for (let i = 1; i < cellSpan - 1; i++) {
          newStateMap[`${x}-${y + i}`] = {
            state: "occupied",
            source: overId,
            task,
          }
        }
        newStateMap[`${x}-${y + cellSpan - 1}`] = {
          state: "occupied-end",
          source: overId,
          task,
        }
      }

      return newStateMap
    })
  }

  const handleDragEndBetweenCells = (over: Over, active: Active) => {
    //remove task from cellStateMap
    const task = active.data.current?.task
    const source = active.data.current?.source
    const cellSpan = task.duration
    const emptyCell = {
      state: "empty",
      source: null,
      task: null,
    }
    setCellStateMap((prev: any) => {
      const newStateMap = { ...prev }
      const [x, y] = source.split("-").map((n: string) => Number(n))
      newStateMap[source] = emptyCell
      if (cellSpan > 1) {
        for (let i = 1; i < cellSpan - 1; i++) {
          newStateMap[`${x}-${y + i}`] = emptyCell
        }
        newStateMap[`${x}-${y + cellSpan - 1}`] = emptyCell
      }
      return newStateMap
    })

    //add task to cellStateMap
    const overId = over.id as string
    setCellStateMap((prev: any) => {
      const newStateMap = { ...prev }
      const [x, y] = overId.split("-").map((n: string) => Number(n))
      newStateMap[overId] = {
        state: "occupied-start",
        source: overId,
        task,
      }
      if (cellSpan > 1) {
        for (let i = 1; i < cellSpan - 1; i++) {
          newStateMap[`${x}-${y + i}`] = {
            state: "occupied",
            source: overId,
            task,
          }
        }
        newStateMap[`${x}-${y + cellSpan - 1}`] = {
          state: "occupied-end",
          source: overId,
          task,
        }
      }
      return newStateMap
    })
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    const canDrop = checkCanDrop(over, active)
    if (active.id !== over.id && canDrop) {
      //if task is in the task array)
      if (active.data.current.source === null) {
        handleDragEndFromSlider(over, active)
      } else {
        handleDragEndBetweenCells(over, active)
      }
    }
    setDraggedTask({ draggableId: null, task: null })
  }

  const handleDragStart = (event: any) => {
    const { active } = event
    const newDraggedTask = {
      draggableId: active.id,
      task: active.data.current.task,
    }
    setDraggedTask(newDraggedTask)
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
              <TaskSlider tasks={tasks} />
              <DataGrid
                stands={stands}
                cellStateMap={cellStateMap}
                draggedTask={draggedTask}
                view={view}
              />
            </DndContext>
          </Stack>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
