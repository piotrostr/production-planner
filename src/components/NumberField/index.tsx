import { InputBase, Stack } from "@mui/material"

interface NumberFieldProps {
  placeholder: string
  icon: React.ReactNode
}

export function NumberField({ placeholder, icon }: NumberFieldProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 200,
        border: "1px solid black",
      }}
    >
      <InputBase
        sx={{ mx: 3, flex: 1 }}
        placeholder={placeholder}
        type="number"
      />
      <Stack
        bgcolor="#D9D9D9"
        width={60}
        height={45}
        borderLeft="1px solid black"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Stack>
    </Stack>
  )
}
