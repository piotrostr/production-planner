import { Task as TaskType } from "../../../../types/task"
import { Stack, Typography } from "@mui/material"

interface TaskProps {
  task: TaskType
}

export function DroppedTask({ task }: TaskProps) {
  return (
    <Stack
      width="100px"
      height="2rem"
      justifyContent="center"
      px={3}
      sx={{
        boxSizing: "border-box",
        bgcolor: task.bgcolor,
        color: "transparent",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      <Typography variant="body2" fontWeight={700}>
        /
      </Typography>
    </Stack>
  )
}
