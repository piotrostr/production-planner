import { Draggable } from "../Draggable"
import { Droppable } from "../Droppable"
import { Task } from "../Task"
import { DroppedTask } from "../DroppedTask"
import { Stack } from "@mui/material"
import { useAppSelector } from "../../hooks"

import { Task as TaskType } from "../../slices/tasks"

interface DataCellProps {
  draggedTask: any
  cellWidth: number
  rowId: string | number
  date: string
}
export function DataCell({
  draggedTask,
  cellWidth,
  rowId,
  date,
}: DataCellProps) {
  const time = new Date(date).getTime()
  const cellKey = `${rowId}-${time}`
  const cells = useAppSelector((state) => state.grid.grid?.cells)
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const cell = cells?.[cellKey]
  const state = cell?.state
  const tasksInCell = cell?.tasks

  const renderTask = (task: TaskType, left: number, width: number) => {
    if (state == "occupied-start" && draggedTask.task?.id !== task.id) {
      return (
        <Draggable
          id={cellKey}
          data={{
            task,
            sourceId: cellKey,
          }}
        >
          <DroppedTask
            task={task}
            cellWidth={cellWidth}
            left={left}
            width={width}
          />
        </Draggable>
      )
    } else if (state == "occupied-start" && draggedTask.task?.id === task.id) {
      return (
        <Draggable
          id={cellKey}
          data={{
            task,
            sourceId: cellKey,
          }}
        >
          <Task task={task} />
        </Draggable>
      )
    } else {
      return <div />
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
      <Droppable id={cellKey}>
        <>
          {tasksInCell?.map((taskInCell, idx) => {
            const task = tasks[taskInCell.taskId]
            const { left, width } = taskInCell
            return renderTask(task, left, width)
          })}
        </>
      </Droppable>
    </Stack>
  )
}
