import { Task as TaskType } from "../../../types/task"
import { Stack, Divider } from "@mui/material"
import { Task } from "../Task"

interface TaskSliderProps {
  tasks: TaskType[]
}

export function TaskSlider({ tasks }: TaskSliderProps) {
  return (
    <Stack
      direction="row"
      border="1px solid #000000"
      width="100%"
      py={1}
      px={2}
      spacing={2}
      overflow="auto"
    >
      {tasks.map((task, idx) => (
        <Stack direction="row" key={task.id} spacing={2}>
          <Task task={task} />
          {idx !== tasks.length - 1 && (
            <Divider
              orientation="vertical"
              sx={{ bgcolor: "#1E1E1E87", width: "2px", borderRadius: "2px" }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  )
}
