import { Task as TaskType } from "../../../types/task"
import { Stack, Typography } from "@mui/material"

interface DroppedTaskProps {
  task: TaskType
  cellWidth: number
  cellSpan: number
}

export function DroppedTask({ task, cellWidth, cellSpan }: DroppedTaskProps) {
  return (
    <Stack
      width={cellWidth * cellSpan}
      height="2rem"
      justifyContent="center"
      position="absolute"
      top="50%"
      px={3}
      sx={{
        zIndex: 20,
        transform: "translateY(-50%)",
        boxSizing: "border-box",
        bgcolor: task.bgcolor,
        color: "#FFFFFF",
        borderRadius: 1,
        border: "1px solid black",
      }}
    >
      <Typography variant="body2" fontWeight={700}>
        {task.title}
      </Typography>
    </Stack>
  )
}
