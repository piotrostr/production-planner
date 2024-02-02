import { Modal as MuiModal, Stack } from "@mui/material"

interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
  children: React.ReactNode
}

export function Modal({ open, setOpen, children }: ModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={() => setOpen(null)}
      sx={{
        "& .MuiBackdrop-root": {
          bgcolor: "transparent",
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        width="fit-content"
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
        border="1px solid black"
        boxShadow={16}
      >
        {children}
      </Stack>
    </MuiModal>
  )
}
