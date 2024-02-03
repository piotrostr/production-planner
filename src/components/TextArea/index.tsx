import { InputBase, Stack } from "@mui/material"

interface TextAreaProps {
  placeholder: string
}

export function TextArea({ placeholder }: TextAreaProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        width: 400,
        border: "1px solid black",
      }}
    >
      <InputBase
        sx={{ mx: 3, my: 1, flex: 1 }}
        placeholder={placeholder}
        multiline
        minRows={5}
      />
    </Stack>
  )
}
