import { Draggable } from "../Draggable"
import { Droppable } from "../Droppable"
import { Task } from "../Task"
import { DroppedTask } from "../DroppedTask"
import { Stack } from "@mui/material"

interface DataCellProps {
  columnIndex: number
  rowIndex: number
  cellStateMap: any
  draggedTask: any
  cellWidth: number
}
export function DataCell({
  columnIndex,
  rowIndex,
  cellStateMap,
  draggedTask,
  cellWidth,
}: DataCellProps) {
  const data = cellStateMap[`${rowIndex}-${columnIndex}`]
  const cellKey = `${rowIndex}-${columnIndex}`
  const { task, state } = cellStateMap?.[cellKey] || {}

  const renderTask = () => {
    if (draggedTask.id !== null && draggedTask.draggableId === cellKey) {
      return (
        <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
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
        const [hours, minutes] = task.time.split(":")
        const cellSpan = Number(hours) * 4 + Number(minutes) / 15
        return (
          <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
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
      style={{
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
