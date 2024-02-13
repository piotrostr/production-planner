import { Stack, Box } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

interface ColorFieldProps {
  value?: string
  name: string
  setFieldValue: (name: string, value: string) => void
  colorOptions: { bgcolor: string; color: string }[]
}

export function ColorField({
  value,
  setFieldValue,
  name,
  colorOptions,
}: ColorFieldProps) {
  return (
    <Stack direction="row" justifyContent="space-between" width={400}>
      {colorOptions.map((color, index) => (
        <Box
          onClick={() => setFieldValue(name, color.bgcolor)}
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
            border:
              value === color.bgcolor
                ? "2px solid #1D1D1D"
                : "1px solid #1D1D1D",
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
