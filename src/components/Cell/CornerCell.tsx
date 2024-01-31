import { Box } from "@mui/material"

export function CornerCell() {
  return (
    <Box
      sx={{
        width: 225,
        bgcolor: "#D9D9D9",
        boxSizing: "border-box",
        borderBottom: "1px solid black",
        borderRight: "1px solid black",
      }}
    />
  )
}
