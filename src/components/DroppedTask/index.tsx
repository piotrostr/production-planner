import { Stack, Typography } from "@mui/material";
import { Task } from "../../slices/tasks";
import { ContextMenu } from "../ContextMenu";
import { useState } from "react";

interface DroppedTaskProps {
  task: Task;
  cellWidth: number;
  left: number | undefined;
  width: number | undefined;
}

export function DroppedTask({
  task,
  cellWidth,
  left,
  width,
}: DroppedTaskProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ left: 0, top: 0 });
  const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCursorPosition({ left: event.clientX - 2, top: event.clientY - 4 });
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      onContextMenu={(e) => handleRightClick(e)}
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
            textAlign: "center",
            boxSizing: "border-box",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {task.title}
        </Typography>
      ) : null}
      <ContextMenu
        open={open}
        anchorEl={anchorEl}
        cursorPosition={cursorPosition}
        onClose={handleClose}
        task={task}
      />
    </Stack>
  );
}
