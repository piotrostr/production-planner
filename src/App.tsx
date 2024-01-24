import { Stack } from "@mui/material"
import { TaskSlider } from "./components/TaskSlider"

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
  },
  {
    id: 5,
    title: "Task 1",
    description: "Description 1",
  },
  {
    id: 6,
    title: "Task 2",
    description: "Description 2",
  },
  {
    id: 7,
    title: "Task 3",
    description: "Description 3",
  },
  {
    id: 8,
    title: "Task 4",
    description: "Description 4",
  },
]

function App() {
  return (
    <>
      <Stack width="100vw" height="100vh" pt="10rem">
        <TaskSlider tasks={tasks} />
      </Stack>
    </>
  )
}

export default App
