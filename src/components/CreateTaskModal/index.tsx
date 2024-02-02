import { Stack, Typography } from "@mui/material"
import { TextField } from "../TextField"
import CloseIcon from "@mui/icons-material/Close"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"

interface CreateTaskModal {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

export function CreateTaskModal({ open, setOpen }: CreateTaskModal) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Stack alignItems="center" justifyContent="center">
        <TitleBar setOpen={setOpen} />
        <Stack p={2} bgcolor="white" width="fit-content" spacing={4}>
          <Typography variant="h6">Dodaj zadanie</Typography>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1">Nazwa</Typography>
              <TextField placeholder="Nazwa zadania" icon={null} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1">Początek</Typography>
              <TextField placeholder="Nazwa zadania" icon={null} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1">Koniec</Typography>
              <TextField placeholder="Nazwa zadania" icon={null} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1">Kolor</Typography>
              <TextField placeholder="Nazwa zadania" icon={null} />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1">Opis</Typography>
              <TextField placeholder="Nazwa zadania" icon={null} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  )
}
