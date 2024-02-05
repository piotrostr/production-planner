import { Stack, Typography } from "@mui/material"
import { Task } from "../../slices/tasks"

interface DroppedTaskProps {
  task: Task
  cellWidth: number
  cellSpan: number
}

export function DroppedTask({ task, cellWidth, cellSpan }: DroppedTaskProps) {
  console.log(task)
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
