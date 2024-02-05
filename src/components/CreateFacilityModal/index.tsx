//lokalizacja -> czynnosc -> opis -> siła robocza -> grupa -> kolor
// sila robocza - number field, icon={<DriveFileRenameOutlineIcon />}
//
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { Stack, Typography } from "@mui/material"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"
import { TextArea } from "../TextArea"
import { SecondaryButton } from "../SecondaryButton"
import { PrimaryButton } from "../PrimaryButton"
import { doc, collection } from "firebase/firestore"
import { firestore } from "../../../firebase.config"
import { Form, Formik, FormikHelpers } from "formik"
import { Dropdown } from "../Dropdown"
import { ColorField } from "../ColorField"
import { NumberField } from "../NumberField"
import { useAppDispatch } from "../../hooks"
import { addFacilityStart } from "../../slices/facilities"

interface CreateFacilityModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<null>>
}

interface FormData {
  location: string
  activity: string
  description: string
  manpower: number
  bgcolor: string
}

const initialValues = {
  location: "",
  activity: "",
  description: "",
  manpower: 0,
  bgcolor: "",
}

const locations = [
  { value: "BOP_GA", label: "BOP_GA" },
  { value: "BOP_GD", label: "BOP_GD" },
]

const activities = [
  { value: "CUTTING", label: "CUTTING" },
  { value: "PREFABRICATION", label: "PREFABRICATION" },
  { value: "TRANSPORT", label: "TRANSPORT" },
  { value: "ASSEMBLY", label: "ASSEMBLY" },
  { value: "QUALITY CONTROL", label: "QUALITY CONTROL" },
  { value: "PAINTING", label: "PAINTING" },
  { value: "INSTALLATION", label: "INSTALLATION" },
]

export function CreateFacilityModal({
  open,
  setOpen,
}: CreateFacilityModalProps) {
  const dispatch = useAppDispatch()
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<FormData>["setFieldValue"]
  ) => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const handleSubmit = async (
    values: FormData,
    resetForm: FormikHelpers<FormData>["resetForm"]
  ) => {
    try {
      const facilityId = doc(collection(firestore, "facilities")).id
      dispatch(
        addFacilityStart({
          id: facilityId,
          title: values.location + " " + values.activity,
          tasks: [],
          ...values,
        })
      )
      setOpen(null)
      resetForm()
      alert("Dodano stanowisko")
    } catch (error) {
      resetForm()
      alert((error as Error).message)
    }
  }

  const handleClose = (resetForm: FormikHelpers<FormData>["resetForm"]) => {
    setOpen(null)
    resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormData, { resetForm }) =>
        handleSubmit(values, resetForm)
      }
    >
      {({ values, handleSubmit, setFieldValue, resetForm }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Modal open={open} onClose={() => handleClose(resetForm)}>
              <Stack alignItems="center" justifyContent="center">
                <TitleBar onClose={() => handleClose(resetForm)} />
                <Stack p={2} bgcolor="white" width="fit-content" spacing={4}>
                  <Typography variant="h6">Dodaj stanowisko</Typography>
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={5}
                      alignItems="center"
                    >
                      <Typography variant="body1">Lokalizacja</Typography>
                      <Dropdown
                        options={locations}
                        placeholder="Wybierz lokalizacje"
                        value={values.location}
                        setFieldValue={setFieldValue}
                        name="location"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={5}
                      alignItems="center"
                    >
                      <Typography variant="body1">Czynność</Typography>
                      <Dropdown
                        options={activities}
                        placeholder="Wybierz czynność"
                        value={values.activity}
                        setFieldValue={setFieldValue}
                        name="activity"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={5}
                    >
                      <Typography variant="body1">Opis*</Typography>
                      <TextArea
                        placeholder="Opis"
                        value={values.description}
                        onChange={(e) => handleInputChange(e, setFieldValue)}
                        name="description"
                      />
                    </Stack>
                    <Stack direction="row" spacing={5} alignItems="center">
                      <Typography variant="body1" width={100}>
                        Siła robocza
                      </Typography>
                      <NumberField
                        placeholder="ilość osób"
                        icon={<DriveFileRenameOutlineIcon />}
                        value={values.manpower}
                        onChange={(e) => handleInputChange(e, setFieldValue)}
                        name="manpower"
                      />
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
                      <ColorField
                        value={values.bgcolor}
                        setFieldValue={setFieldValue}
                        name="bgcolor"
                      />
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={5}
                  >
                    <SecondaryButton
                      onClick={() => handleClose(resetForm)}
                      label="Anuluj"
                    />
                    <PrimaryButton
                      type="submit"
                      onClick={() => handleSubmit()}
                      label="Zapisz"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Modal>
          </Form>
        </>
      )}
    </Formik>
  )
}
