import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Menu } from "@mui/material";
import { Task } from "../../slices/tasks";
import { CreateTaskModal } from "../CreateTaskModal";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateGridStart } from "../../slices/grid";
import { Facility } from "../../slices/facilities";
import { CreateFacilityModal } from "../CreateFacilityModal";

interface ContextMenuProps {
  open: boolean;
  onClose: () => void;
  modalOpen: string | null;
  setModalOpen: React.Dispatch<React.SetStateAction<string | null>>;
  isGridUpdated: boolean;
  setIsGridUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  item: Task | Facility;
  cursorPosition: { top: number; left: number };
  options: { title: string; onClick: () => void; icon: JSX.Element }[];
}

export function ContextMenu({
  open,
  onClose,
  item,
  cursorPosition,
  options,
  isGridUpdated,
  setIsGridUpdated,
  modalOpen,
  setModalOpen,
}: ContextMenuProps) {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.grid.grid);

  useEffect(() => {
    if (isGridUpdated && grid) {
      dispatch(updateGridStart(grid));
      setIsGridUpdated(false);
    }
  }, [isGridUpdated, dispatch, setIsGridUpdated, grid]);

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
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
          <Divider />
          {options.map((option, idx) => (
            <MenuItem key={idx} onClick={option.onClick}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.title}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {modalOpen == "updateTask" ? (
        <CreateTaskModal
          setOpen={setModalOpen}
          open={modalOpen == "updateTask" ? true : false}
          taskId={item.id}
        />
      ) : null}
      {modalOpen == "updateFacility" ? (
        <CreateFacilityModal
          setOpen={setModalOpen}
          open={modalOpen == "updateFacility" ? true : false}
          facilityId={item.id}
        />
      ) : null}
    </>
  );
}
