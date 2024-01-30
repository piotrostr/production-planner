import { Draggable } from "../Draggable"
import { Droppable } from "../Droppable"
import { Task } from "../Task"
import { DroppedTask, DroppedTaskStart, DroppedTaskEnd } from "./DroppedTask"
import { Stack } from "@mui/material"

interface DataCellProps {
  style: any
  columnIndex: number
  rowIndex: number
  cellStateMap: any
  draggedTask: any
}
export function DataCell({
  style,
  columnIndex,
  rowIndex,
  cellStateMap,
  draggedTask,
}: DataCellProps) {
  const data = cellStateMap[`${rowIndex}-${columnIndex}`]
  const cellKey = `${rowIndex}-${columnIndex}`
  const { task, state } = cellStateMap?.[cellKey] || {}

  const renderTask = () => {
    if (draggedTask.id !== null && draggedTask.draggableId === cellKey) {
      return <Task task={task} />
    } else if (
      draggedTask &&
      draggedTask.draggableId !== cellKey &&
      draggedTask?.task?.id === task?.id
    ) {
      return <div style={{ color: "transparent" }}>/</div>
    } else {
      switch (state) {
        case "occupied":
          return (
            <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
              <DroppedTask task={task} />
            </Draggable>
          )
        case "occupied-start":
          return (
            <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
              <DroppedTaskStart
                task={task}
                cellStateMap={cellStateMap}
                cellKey={cellKey}
              />
            </Draggable>
          )
        case "occupied-end":
          return (
            <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
              <DroppedTaskEnd task={task} />
            </Draggable>
          )
        default:
          return null
      }
    }
  }

  return (
    <Stack
      justifyContent="center"
      style={{
        ...style,
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRight: "1px solid #D9D9D9",
        borderBottom: "1px solid black",
        maxHeight: 50,
        marginTop: 50,
        marginLeft: 125,
        background: "white",
        userSelect: "none",
      }}
    >
      <Droppable id={cellKey}>{renderTask()}</Droppable>
    </Stack>
  )
}
