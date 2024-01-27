import { Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"
import { ProductionSchedule } from "./components/ProductionSchedule"
import { DndContext } from "@dnd-kit/core"
import { Toolbar } from "./components/Toolbar"
import { VirtualizedTable } from "./components/VirtualizedTable"

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    bgcolor: "#D5009A",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    bgcolor: "#00A2D5",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    bgcolor: "#04D500",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
    bgcolor: "#D5009A",
  },
  {
    id: 5,
    title: "Task 1",
    description: "Description 1",
    bgcolor: "#00A2D5",
  },
  {
    id: 6,
    title: "Task 2",
    description: "Description 2",
    bgcolor: "#04D500",
  },
  {
    id: 7,
    title: "Task 3",
    description: "Description 3",
    bgcolor: "#D5009A",
  },
  {
    id: 8,
    title: "Task 4",
    description: "Description 4",
    bgcolor: "#00A2D5",
  },
]

const stands = [
  {
    id: 1,
    title: "Stand 1",
    description: "Description 1",
    bgcolor: "#D5009A",
  },
  {
    id: 2,
    title: "Stand 2",
    description: "Description 2",
    bgcolor: "#00A2D5",
  },
  {
    id: 3,
    title: "Stand 3",
    description: "Description 3",
    bgcolor: "#04D500",
  },
  {
    id: 4,
    title: "Stand 4",
    description: "Description 4",
    bgcolor: "#D5009A",
  },
]

function App() {
  return (
    <>
      <Stack width="100vw" height="100vh">
        <Toolbar />
        <DndContext>
          <TaskSlider tasks={tasks} />
          <VirtualizedTable stands={[...stands, ...stands]} />
        </DndContext>
      </Stack>
    </>
  )
}

export default App
