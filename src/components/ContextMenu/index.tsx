import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Menu } from "@mui/material";
import { Task } from "../../slices/tasks";

interface ContextMenuProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  cursorPosition: { top: number; left: number };
}

export function ContextMenu({
  open,
  onClose,
  task,
  cursorPosition,
}: ContextMenuProps) {
  return (
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
        <MenuItem>
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
  );
}
