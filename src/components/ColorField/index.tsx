import { Stack, Box } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

const colors = [
  {
    bgcolor: "#708FF",
    color: "#FFFFFF",
  },
  {
    bgcolor: "#FFC0CB",
    color: "#000000",
  },
  {
    bgcolor: "#FFD700",
    color: "#000000",
  },
  {
    bgcolor: "#FF4500",
    color: "#000000",
  },
  {
    bgcolor: "#FF6347",
    color: "#000000",
  },
]

export function ColorField() {
  return (
    <Stack direction="row" justifyContent="space-between" width={400}>
      {colors.map((color, index) => (
        <Box
          key={index}
          bgcolor={color.bgcolor}
          color={color.color}
          width={45}
          height={45}
          borderRadius={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: "pointer",
            boxSizing: "border-box",
            border: "1px solid black",
          }}
        />
      ))}
      <Stack
        width={45}
        height={45}
        borderRadius={1}
        sx={{
          cursor: "pointer",
          boxSizing: "border-box",
          border: "3px dashed #D9D9D9",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <AddIcon fontSize="large" sx={{ color: "#D9D9D9" }} />
      </Stack>
    </Stack>
  )
}
