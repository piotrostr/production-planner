import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Stack } from "@mui/material"
import { ToolbarIcon } from "../ToolbarIcon"
import { PopoverCreate } from "../PopoverCreate"
import { useState } from "react"
import { CreateTaskModal } from "../CreateTaskModal"
import { CreateActivityModal } from "../CreateActivityModal"
import { CreateLocationModal } from "../CreateLocationModal"
import { CreateFacilityModal } from "../CreateFacilityModal"
import { CreateDeadlineModal } from "../CreateDeadlineModal"
import { CreateGroupModal } from "../CreateGroupModal"
import { ToggleView } from "../ToggleView"

const icons = [
  {
    icon: <CalendarMonthIcon />,
    iconText: "idź do",
    expandMore: true,
  },
  {
    icon: <FilterAltIcon />,
    iconText: "Filtruj",
  },
  {
    icon: <SearchIcon />,
    iconText: "Szukaj",
  },
  {
    icon: <MoreVertIcon />,
    iconText: "Więcej",
    expandMore: true,
  },
]

export function TimelineToolbar() {
  return (
    <Stack
      direction="row"
      width="100%"
      bgcolor="lightgrey"
      alignItems="center"
      justifyContent="flex-end"
      borderBottom="1px solid #000000"
    >
      <ToggleView />
    </Stack>
  )
}
