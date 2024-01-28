import { Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"
import { DndContext } from "@dnd-kit/core"
import { Toolbar } from "./components/Toolbar"
import { VirtualizedTable } from "./components/VirtualizedTable"
import { useEffect, useState } from "react"

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
    id: 4,
    title: "BOP GDANSK MAL 1",
    description: "Description 4",
    bgcolor: "#C598FF",
  },
  {
    id: 5,
    title: "BOP GDANSK MAL 2",
    description: "Description 4",
    bgcolor: "#C598FF",
  },
  {
    id: 6,
    title: "BOP GDYNIA SPAW 1",
    description: "Description 3",
    bgcolor: "#B3FFCD",
  },
  {
    id: 7,
    title: "BOP GDYNIA SPAW 2",
    description: "Description 4",
    bgcolor: "#B3FFCD",
  },
  {
    id: 8,
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
          stateMap[`${j + 1}-${i + 1}`] = {
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      //if task is in the task array)
      if (active.data.current.source === null) {
        const overId = over.id
        const { task } = active.data.current
        const [hours, minutes] = task.time.split(":")
        const cellSpan = Number(hours) * 4 + Number(minutes) / 15
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
          const [x, y] = overId.split("-").map((n: string) => Number(n))
          for (let i = 1; i < cellSpan; i++) {
            newStateMap[`${x}-${y + i}`] = {
              state: "occupied",
              source: overId,
              task,
            }
          }
          newStateMap[`${x}-${y + cellSpan}`] = {
            state: "occupied-end",
            source: overId,
            task,
          }
          return newStateMap
        })
      } else {
        //remove task from cellStateMap
        const { task, source } = active.data.current
        const [hours, minutes] = task.time.split(":")
        const cellSpan = Number(hours) * 4 + Number(minutes) / 15
        setCellStateMap((prev: any) => {
          const newStateMap = { ...prev }
          newStateMap[source] = {
            state: "empty",
            source: null,
            task: null,
          }
          const [x, y] = source.split("-").map((n: string) => Number(n))
          for (let i = 1; i < cellSpan; i++) {
            newStateMap[`${x}-${y + i}`] = {
              state: "empty",
              source: null,
              task: null,
            }
          }
          newStateMap[`${x}-${y + cellSpan}`] = {
            state: "empty",
            source: null,
            task: null,
          }
          return newStateMap
        })
        //add task to cellStateMap
        const overId = over.id

        setCellStateMap((prev: any) => {
          const newStateMap = { ...prev }
          newStateMap[overId] = {
            state: "occupied-start",
            source: overId,
            task,
          }
          const [x, y] = overId.split("-").map((n: string) => Number(n))
          for (let i = 1; i < cellSpan; i++) {
            newStateMap[`${x}-${y + i}`] = {
              state: "occupied",
              source: overId,
              task,
            }
          }
          newStateMap[`${x}-${y + cellSpan}`] = {
            state: "occupied-end",
            source: overId,
            task,
          }
          return newStateMap
        })
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
      <Stack width="100vw" height="100vh">
        <Toolbar />
        <DndContext
          autoScroll={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <TaskSlider tasks={tasks} scroll={scroll} />
          <VirtualizedTable
            stands={[...stands]}
            setScroll={setScroll}
            cellStateMap={cellStateMap}
            draggedTask={draggedTask}
          />
        </DndContext>
      </Stack>
    </>
  )
}

export default App
