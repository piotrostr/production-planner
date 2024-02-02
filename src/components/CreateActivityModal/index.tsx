import { Stack, Typography } from "@mui/material"
import { TextField } from "../TextField"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"
import { TextArea } from "../TextArea"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { SecondaryButton } from "../SecondaryButton"
import { PrimaryButton } from "../PrimaryButton"

interface CreateActivityModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

export function CreateActivityModal({
  open,
  setOpen,
}: CreateActivityModalProps) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Stack alignItems="center" justifyContent="center">
        <TitleBar setOpen={setOpen} />
        <Stack p={2} bgcolor="white" width="fit-content" spacing={4}>
          <Typography variant="h6">Dodaj czynność</Typography>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1">Nazwa</Typography>
              <TextField
                placeholder="Nazwa"
                icon={<DriveFileRenameOutlineIcon />}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={5}>
              <Typography variant="body1">Opis*</Typography>
              <TextArea placeholder="Opis" />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={5}>
            <SecondaryButton onClick={() => setOpen(null)} label="Anuluj" />
            <PrimaryButton onClick={() => setOpen(null)} label="Zapisz" />
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  )
}
