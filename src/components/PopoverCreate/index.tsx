import { Popover, Stack, Typography, Divider } from "@mui/material"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AlarmAddIcon from "@mui/icons-material/AlarmAdd"
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork"

const items = [
  {
    name: "facility",
    label: "Stanowisko",
    icon: <AddHomeWorkIcon fontSize="small" />,
  },
  {
    name: "task",
    label: "Zadanie",
    icon: <AssignmentIcon fontSize="small" />,
  },
  {
    name: "deadline",
    label: "Deadline",
    icon: <AlarmAddIcon fontSize="small" />,
  },
]

interface PopoverCreateProps {
  anchorEl: HTMLButtonElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  setModalOpen: React.Dispatch<React.SetStateAction<string>>
}

export function PopoverCreate({
  anchorEl,
  setAnchorEl,
  setModalOpen,
}: PopoverCreateProps) {
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
          bgcolor: "background.default",
        },
      }}
    >
      <Stack px={2} py="10px" divider={<Divider />}>
        {items.map((item, idx) => (
          <button
            key={idx}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "10px",
            }}
            onClick={() => {
              setModalOpen(item.name)
              handleClose()
            }}
          >
            <Stack direction="row" spacing={4} pr={2} height="100%">
              {item.icon}
              <Typography variant="body2">{item.label}</Typography>
            </Stack>
          </button>
        ))}
      </Stack>
    </Popover>
  )
}
