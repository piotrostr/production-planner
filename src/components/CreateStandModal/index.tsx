import { Stack, Typography } from "@mui/material"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { SecondaryButton } from "../SecondaryButton"
import { PrimaryButton } from "../PrimaryButton"
import { NumberField } from "../NumberField"
import { Dropdown } from "../Dropdown"
import { useState } from "react"
import { ColorField } from "../ColorField"

interface CreateStandModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

export function CreateStandModal({ open, setOpen }: CreateStandModalProps) {
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false)
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false)
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
              <Dropdown
                open={locationDropdownOpen}
                setOpen={setLocationDropdownOpen}
                placeholder="Wybierz lokalizacje"
                icon={
                  locationDropdownOpen ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )
                }
              />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography variant="body1" width={100}>
                Czynność
              </Typography>
              <Dropdown
                open={activityDropdownOpen}
                setOpen={setActivityDropdownOpen}
                placeholder="Wybierz czynność"
                icon={
                  activityDropdownOpen ? (
                    <KeyboardArrowUpIcon fontSize="large" />
                  ) : (
                    <KeyboardArrowDownIcon fontSize="large" />
                  )
                }
              />
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
