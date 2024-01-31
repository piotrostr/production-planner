import { Draggable } from "../Draggable"
import { Droppable } from "../Droppable"
import { Task } from "../Task"
import { DroppedTask, DroppedTaskStart, DroppedTaskEnd } from "../DroppedTask"
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
      return <div style={{ color: "transparent" }}>/</div>
    } else {
      switch (state) {
        case "occupied":
          return (
            <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
              <DroppedTask task={task} cellWidth={cellWidth} />
            </Draggable>
          )
        case "occupied-start":
          return (
            <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
              <DroppedTaskStart
                task={task}
                cellStateMap={cellStateMap}
                cellKey={cellKey}
                cellWidth={cellWidth}
              />
            </Draggable>
          )
        case "occupied-end":
          return (
            <Draggable id={cellKey} scroll={{ x: 0, y: 0 }} data={data}>
              <DroppedTaskEnd task={task} cellWidth={cellWidth} />
            </Draggable>
          )
        default:
          return <div style={{ color: "transparent" }}></div>
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
