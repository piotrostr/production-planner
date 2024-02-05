import { Draggable } from "../Draggable"
import { Droppable } from "../Droppable"
import { Task } from "../Task"
import { DroppedTask } from "../DroppedTask"
import { Stack } from "@mui/material"
import { useAppSelector } from "../../hooks"
import { GridType } from "../../slices/grid"

interface DataCellProps {
  columnIndex: number
  draggedTask: any
  cellWidth: number
  rowId: string | number
}
export function DataCell({
  columnIndex,
  draggedTask,
  cellWidth,
  rowId,
}: DataCellProps) {
  const cellKey = `${rowId}-${columnIndex}`
  const gridState = useAppSelector((state) => state.grid)
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const cellStateMap = gridState.grid

  const cell = cellStateMap?.cells[cellKey]
  const state = cell?.state
  const taskId = cell?.taskId as string
  const task = tasks?.[taskId]

  const renderTask = () => {
    if (draggedTask.id !== null && draggedTask.draggableId === cellKey) {
      return (
        <Draggable id={cellKey} data={task}>
          <Task task={task} />
        </Draggable>
      )
    } else if (
      draggedTask &&
      draggedTask.draggableId !== cellKey &&
      draggedTask?.task?.id === task?.id
    ) {
      return <div />
    } else {
      if (state === "occupied-start") {
        const cellSpan = task?.duration
        return (
          <Draggable id={cellKey} data={task}>
            <DroppedTask
              task={task}
              cellWidth={cellWidth}
              cellSpan={cellSpan}
            />
          </Draggable>
        )
      } else {
        return <div />
      }
    }
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: cellWidth,
        height: 50,
        position: "relative",
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRight: "1px solid #D9D9D9",
        borderBottom: "1px solid black",
        background: "white",
        userSelect: "none",
      }}
    >
      <Droppable id={cellKey}>{renderTask()}</Droppable>
    </Stack>
  )
}
