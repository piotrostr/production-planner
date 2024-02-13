import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { Stack, Typography } from "@mui/material"
import { TextField } from "../TextField"
import { Modal } from "../Modal"
import { TitleBar } from "../TitleBar"
import { TextArea } from "../TextArea"
import { SecondaryButton } from "../SecondaryButton"
import { PrimaryButton } from "../PrimaryButton"
import { doc, collection } from "firebase/firestore"
import { firestore } from "../../../firebase.config"
import { Form, Formik, FormikHelpers } from "formik"
import { ColorField } from "../ColorField"
import { NumberField } from "../NumberField"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Task, addTaskStart, updateTaskStart } from "../../slices/tasks"
import { useEffect, useState } from "react"
import { setDragDisabled } from "../../slices/drag"

interface CreateTaskModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<string | null>>
  taskId?: string
}

interface FormData {
  title: string
  description: string
  duration: number
  bgcolor: string
}

const initialValues = {
  id: "",
  title: "",
  dropped: false,
  description: "",
  duration: 0,
  bgcolor: "",
}

export function CreateTaskModal({
  open,
  setOpen,
  taskId,
}: CreateTaskModalProps) {
  const [task, setTask] = useState<Task>(initialValues)
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const dispatch = useAppDispatch()
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<FormData>["setFieldValue"]
  ) => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  useEffect(() => {
    if (taskId) {
      const task = tasks[taskId]
      setTask(task)
    }
  }, [taskId, tasks])

  const handleSubmit = async (
    values: FormData,
    resetForm: FormikHelpers<FormData>["resetForm"]
  ) => {
    try {
      if (!taskId) {
        const id = doc(collection(firestore, "tasks")).id
        dispatch(
          addTaskStart({
            ...values,
            dropped: false,
            id,
          })
        )
      } else {
        dispatch(updateTaskStart({ id: task.id, data: values }))
      }
      setOpen(null)
      resetForm()
    } catch (error) {
      resetForm()
    }
  }

  const handleClose = (resetForm: FormikHelpers<FormData>["resetForm"]) => {
    setOpen(null)
    resetForm()
    dispatch(setDragDisabled(false))
  }

  return (
    <Formik
      initialValues={task}
      enableReinitialize
      onSubmit={(values: FormData, { resetForm }) =>
        handleSubmit(values, resetForm)
      }
    >
      {({ values, handleSubmit, setFieldValue, resetForm, setFormikState }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Modal open={open} onClose={() => handleClose(resetForm)}>
              <Stack alignItems="center" justifyContent="center">
                <TitleBar onClose={() => handleClose(resetForm)} />
                <Stack p={2} bgcolor="white" width="fit-content" spacing={4}>
                  <Typography variant="h6">
                    {taskId ? "Edytuj" : "Dodaj"} zadanie
                  </Typography>
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
                        value={values.title}
                        onChange={(e) => handleInputChange(e, setFieldValue)}
                        name="title"
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
                        Czas trwania
                      </Typography>
                      <NumberField
                        placeholder="Czas"
                        icon={<Typography fontWeight={600}>[dni]</Typography>}
                        value={values.duration}
                        onChange={(e) => handleInputChange(e, setFieldValue)}
                        name="duration"
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
