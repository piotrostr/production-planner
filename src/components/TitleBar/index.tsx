import { Stack } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface TitleBarProps {
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

export function TitleBar({ setOpen }: TitleBarProps) {
  return (
    <Stack
      direction="row-reverse"
      width="100%"
      height="fit-content"
      bgcolor="#5A5A5A"
    >
      <CloseIcon
        sx={{
          color: "white",
          alignSelf: "center",
          justifySelf: "flex-end",
          p: 0.5,
          cursor: "pointer",
        }}
        onClick={() => setOpen(null)}
      />
    </Stack>
  )
}
