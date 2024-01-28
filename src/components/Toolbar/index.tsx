import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Stack } from "@mui/material"
import { ToolbarIcon } from "../ToolbarIcon"

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

export function Toolbar() {
  return (
    <Stack
      direction="row"
      width="100vw"
      minHeight="2.2rem"
      bgcolor="lightgrey"
      alignItems="center"
      justifyContent="space-between"
      borderTop="1px solid #000000"
    >
      <Stack direction="row">
        <ToolbarIcon icon={<MenuIcon />} />
        <ToolbarIcon
          icon={<AddCircleOutlineIcon />}
          iconText="Dodaj"
          expandMore={true}
        />
      </Stack>
      <Stack direction="row">
        {icons.map((icon) => (
          <ToolbarIcon
            icon={icon.icon}
            iconText={icon.iconText}
            expandMore={icon.expandMore}
          />
        ))}
      </Stack>
    </Stack>
  )
}
