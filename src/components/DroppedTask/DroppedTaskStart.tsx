import { Task as TaskType } from "../../../types/task"
import { Stack, Typography } from "@mui/material"

interface TaskProps {
  task: TaskType
  cellStateMap: any
  cellKey: string
  cellWidth: number
}

export function DroppedTaskStart({
  task,
  cellStateMap,
  cellKey,
  cellWidth,
}: TaskProps) {
  //is there a task to the right of this cell that is the same task?
  const rightCellKey = `${cellKey.split("-")[0]}-${
    Number(cellKey.split("-")[1]) + 1
  }`

  const rightCell = cellStateMap?.[rightCellKey]
  const isRightCellSameTask = rightCell?.task?.id === task?.id
  console.log("isRightCellSameTask", isRightCellSameTask)

  return (
    <Stack
      width={cellWidth}
      height="2rem"
      justifyContent="center"
      px={3}
      sx={{
        boxSizing: "border-box",
        bgcolor: task.bgcolor,
        color: "#FFFFFF",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: isRightCellSameTask ? 0 : 5,
        borderBottomRightRadius: isRightCellSameTask ? 0 : 5,
        borderRight: isRightCellSameTask ? "none" : "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
      }}
    >
      <Typography variant="body2" fontWeight={700}>
        {task.title}
      </Typography>
    </Stack>
  )
}
