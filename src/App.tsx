import { Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"
import { DndContext } from "@dnd-kit/core"
import { Toolbar } from "./components/Toolbar"
import { VirtualizedTable } from "./components/VirtualizedTable"
import { useEffect, useState } from "react"
import { snapCenterToCursor } from "@dnd-kit/modifiers"
import { DataGrid, DataGridDemo } from "./components/DataGrid"

const tasksArr = [
  {
    id: 1,
    title: "PP1A",
    description: "Description 1",
    bgcolor: "#D5009A",
    time: "0:15",
  },
  {
    id: 2,
    title: "PP1B",
    description: "Description 2",
    bgcolor: "#D5009A",
    time: "0:30",
  },
  {
    id: 3,
    title: "PP2A",
    description: "Description 3",
    bgcolor: "#00A2D5",
    time: "0:45",
  },
  {
    id: 4,
    title: "PP2B",
    description: "Description 4",
    bgcolor: "#00A2D5",
    time: "1:00",
  },
  {
    id: 5,
    title: "PP3A",
    description: "Description 1",
    bgcolor: "#04D500",
    time: "1:15",
  },
  {
    id: 6,
    title: "PP3B",
    description: "Description 2",
    bgcolor: "#04D500",
    time: "0:15",
  },
  {
    id: 7,
    title: "PP3C",
    description: "Description 3",
    bgcolor: "#04D500",
    time: "0:30",
  },
  {
    id: 8,
    title: "PP4A",
    description: "Description 4",
    bgcolor: "#9100D5",
    time: "1:15",
  },
  {
    id: 9,
    title: "PP5A",
    description: "Description 4",
    bgcolor: "#D5CD00",
    time: "1:15",
  },
  {
    id: 10,
    title: "PP5B",
    description: "Description 4",
    bgcolor: "#D5CD00",
    time: "0:45",
  },
  {
    id: 11,
    title: "PP5C",
    description: "Description 4",
    bgcolor: "#D5CD00",
    time: "1:45",
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
  const [scroll, setScroll] = useState({ x: 0, y: 0 })
  const [cellStateMap, setCellStateMap] = useState({} as any)
  const [tasks, setTasks] = useState(tasksArr)
  const [draggedTask, setDraggedTask] = useState({
    draggableId: null,
    task: null,
  })

  const rowCount = 50
  const columnCount = 100

  useEffect(() => {
    const initializeCellStateMap = () => {
      const stateMap = {} as any
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
          stateMap[`${j}-${i}`] = {
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

  const checkCanDrop = (over, active) => {
    const overId = over.id

    const { task } = active.data.current
    const [hours, minutes] = task.time.split(":")
    const cellSpan = Number(hours) * 4 + Number(minutes) / 15
    const [x, y] = overId.split("-").map((n: string) => Number(n))
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

  const handleDragEndFromSlider = (over, active) => {
    const overId = over.id
    const { task } = active.data.current
    const [hours, minutes] = task.time.split(":")
    const cellSpan = Number(hours) * 4 + Number(minutes) / 15
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

  const handleDragEndBetweenCells = (over, active) => {
    //remove task from cellStateMap
    const { task, source } = active.data.current
    const [hours, minutes] = task.time.split(":")
    const cellSpan = Number(hours) * 4 + Number(minutes) / 15
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
    const overId = over.id
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
      <Stack
        width="100vw"
        height="100vh"
        sx={{
          cursor: draggedTask.draggableId && draggedTask.task ? "none" : "auto",
        }}
      >
        <Toolbar />
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          autoScroll={{ layoutShiftCompensation: false }}
          onDragOver={(event) => {
            console.log(event)
          }}
        >
          <TaskSlider tasks={tasks} scroll={scroll} />
          <DataGrid
            stands={stands}
            cellStateMap={cellStateMap}
            draggedTask={draggedTask}
            setScroll={setScroll}
          />
        </DndContext>
      </Stack>
    </>
  )
}

export default App
