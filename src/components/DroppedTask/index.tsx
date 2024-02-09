import { Stack, Typography } from "@mui/material"
import { Task } from "../../slices/tasks"

interface DroppedTaskProps {
  task: Task
  cellWidth: number
  left: number | undefined
  width: number | undefined
}

export function DroppedTask({
  task,
  cellWidth,
  left,
  width,
}: DroppedTaskProps) {
  return (
    <Stack
      width={width ? width : cellWidth * task.duration}
      height="2rem"
      justifyContent="center"
      position="absolute"
      top="50%"
      alignItems="center"
      left={left}
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
      <Typography variant="body2" fontWeight={700} noWrap>
        {task.title}
      </Typography>
    </Stack>
  )
}
