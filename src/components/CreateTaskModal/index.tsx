import { Stack, Typography } from "@mui/material"
import { TextField } from "../TextField"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { NumberField } from "../NumberField"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { Dropdown } from "../Dropdown"
import { useState } from "react"
import { SecondaryButton } from "../SecondaryButton"
import { PrimaryButton } from "../PrimaryButton"
import { ColorField } from "../ColorField"
import { TextArea } from "../TextArea"

interface CreateTaskModal {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

export function CreateTaskModal({ open, setOpen }: CreateTaskModal) {
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false)
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
              <Typography variant="body1" width={100}>
                Nazwa
              </Typography>
              <TextField
                placeholder="Nazwa zadania"
                icon={<DriveFileRenameOutlineIcon />}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
              <Typography variant="body1" width={100}>
                Czas trwania
              </Typography>
              <NumberField placeholder="Czas" icon={<AccessTimeIcon />} />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Grupa
              </Typography>
              <Dropdown
                open={groupDropdownOpen}
                setOpen={setGroupDropdownOpen}
                placeholder="Wybierz grupę"
                icon={
                  groupDropdownOpen ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )
                }
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={5}>
              <Typography variant="body1" width={100}>
                Opis
              </Typography>
              <TextArea placeholder="Opis" />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
              alignItems="center"
            >
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
