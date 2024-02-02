import { InputBase, Stack } from "@mui/material"

interface TextFieldProps {
  placeholder: string
  icon: React.ReactNode
}

export function Dropdown({ placeholder, icon }: TextFieldProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 400,
        border: "1px solid black",
      }}
    >
      <InputBase sx={{ mx: 3, flex: 1 }} placeholder={placeholder} />
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
