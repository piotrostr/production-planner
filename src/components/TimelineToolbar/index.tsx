import { Stack } from "@mui/material"
import { ToggleView } from "../ToggleView"

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
