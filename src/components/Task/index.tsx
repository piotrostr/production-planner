import { Task as TaskType } from "../../../types/task"
import { Stack } from "@mui/material"

interface TaskProps {
  task: TaskType
}

export function Task({ task }: TaskProps) {
  return (
    <Stack
      width="10rem"
      height="4rem"
      border="1px solid #000000"
      justifyContent="center"
      px={3}
      borderRadius={1}
    >
      {task.title}
    </Stack>
  )
}
