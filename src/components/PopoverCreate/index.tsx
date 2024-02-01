import { Popover, Stack, Typography, Divider } from "@mui/material"
import AssignmentIcon from "@mui/icons-material/Assignment"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import AlarmAddIcon from "@mui/icons-material/AlarmAdd"
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork"

const items = [
  {
    label: "Zadanie",
    icon: <AssignmentIcon fontSize="small" />,
  },
  {
    label: "Stanowisko",
    icon: <AddHomeWorkIcon fontSize="small" />,
  },
  {
    label: "Deadline",
    icon: <AlarmAddIcon fontSize="small" />,
  },
  {
    label: "Grupa",
    icon: <LibraryAddIcon fontSize="small" />,
  },
]

interface PopoverCreateProps {
  anchorEl: HTMLButtonElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
}

export function PopoverCreate({ anchorEl, setAnchorEl }: PopoverCreateProps) {
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionProps={{ timeout: 0 }}
      sx={{
        "& .MuiPopover-paper": {
          borderRadius: 0,
        },
      }}
    >
      <Stack px={1} py={2} spacing={2} divider={<Divider />}>
        {items.map((item) => (
          <Stack direction="row" alignItems="center" px={1} spacing={2}>
            {item.icon}
            <Typography variant="body2">{item.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Popover>
  )
}
