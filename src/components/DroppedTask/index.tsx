import { Stack, Typography } from "@mui/material"
import { Task } from "../../slices/tasks"
import { ContextMenu } from "../ContextMenu"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setDragDisabled } from "../../slices/drag"

interface DroppedTaskProps {
  task: Task
  cellWidth: number
  left: number | undefined
  width: number | undefined
  rowId: string | number
  colId: number
}

export function DroppedTask({
  task,
  cellWidth,
  left,
  width,
  rowId,
  colId,
}: DroppedTaskProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 })
  const dispatch = useAppDispatch()
  const view = useAppSelector((state) => state.view.view)

  const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (view?.name !== "1 mies.") return
    setCursorPosition({ left: event.clientX - 2, top: event.clientY - 4 })
    setAnchorEl(event.currentTarget)
    dispatch(setDragDisabled(true))
  }
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
    dispatch(setDragDisabled(false))
  }

  return (
    <Stack
      onContextMenu={(e) => handleRightClick(e)}
      width={width ? width : cellWidth * task.duration}
      height="2rem"
      justifyContent="center"
      position="absolute"
      top="50%"
      left={left}
      sx={{
        zIndex: 20,
        transform: "translateY(-50%)",
        boxSizing: "border-box",
        bgcolor: task.bgcolor,
        color: "black",
        borderRadius: 1,
        border: "1px solid black",
      }}
    >
      {task.title ? (
        <Typography
          variant="body2"
          fontWeight={700}
          noWrap
          sx={{
            maxWidth: "100%",
            boxSizing: "border-box",
            textOverflow: "clip",
            overflow: "hidden",
            pl: "min(20px, 10%)",
          }}
        >
          {task.title}
        </Typography>
      ) : null}
      <ContextMenu
        open={open}
        cursorPosition={cursorPosition}
        onClose={handleClose}
        task={task}
        rowId={rowId as string}
        colId={colId}
        cellSpan={task.duration}
      />
    </Stack>
  )
}
