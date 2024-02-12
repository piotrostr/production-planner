import Divider from "@mui/material/Divider"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { Menu } from "@mui/material"
import { Task } from "../../slices/tasks"
import { CreateTaskModal } from "../CreateTaskModal"
import { useState } from "react"

interface ContextMenuProps {
  open: boolean
  onClose: () => void
  task: Task
  cursorPosition: { top: number; left: number }
}

export function ContextMenu({
  open,
  onClose,
  task,
  cursorPosition,
}: ContextMenuProps) {
  const [modalOpen, setModalOpen] = useState<string | null>(null)
  return (
    <>
      <Menu
        open={open}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: cursorPosition.top, left: cursorPosition.left }}
        sx={{
          width: 320,
          "& .MuiPaper-root": {
            bgcolor: "white",
          },
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{task.title}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setModalOpen("updateTask")
              onClose()
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edytuj</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Usuń z osi czasu</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Usuń</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <CreateTaskModal
        setOpen={setModalOpen}
        open={modalOpen == "updateTask" ? true : false}
        taskId={task.id}
      />
    </>
  )
}
