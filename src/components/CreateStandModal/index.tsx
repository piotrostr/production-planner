import { Stack, Typography } from "@mui/material"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { SecondaryButton } from "../SecondaryButton"
import { PrimaryButton } from "../PrimaryButton"
import { NumberField } from "../NumberField"
import { Dropdown } from "../Dropdown"
import { ColorField } from "../ColorField"
import { TextArea } from "../TextArea"

interface CreateStandModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

export function CreateStandModal({ open, setOpen }: CreateStandModalProps) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Stack alignItems="center" justifyContent="center">
        <TitleBar setOpen={setOpen} />
        <Stack p={2} bgcolor="white" width="fit-content" spacing={4}>
          <Typography variant="h6">Dodaj stanowisko</Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Lokalizacja
              </Typography>
              <Dropdown placeholder="Wybierz lokalizacje" />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Czynność
              </Typography>
              <Dropdown placeholder="Wybierz czynność" />
            </Stack>
            <Stack direction="row" spacing={5}>
              <Typography variant="body1" width={100}>
                Opis
              </Typography>
              <TextArea placeholder="Wybierz czynność" />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Siła robocza
              </Typography>
              <NumberField
                placeholder="Ilość osób"
                icon={<DriveFileRenameOutlineIcon />}
              />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Grupa
              </Typography>
              <Dropdown placeholder="Brak grupy" />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Kolor
              </Typography>
              <ColorField />
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
