import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Stack, Typography } from "@mui/material";
import { TextField } from "../TextField";
import { Modal } from "../Modal";
import { TitleBar } from "../TitleBar";
import { TextArea } from "../TextArea";
import { SecondaryButton } from "../SecondaryButton";
import { PrimaryButton } from "../PrimaryButton";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase.config";
import { Form, Formik, FormikHelpers } from "formik";

interface CreateActivityModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<null>>;
}

interface FormData {
  name: string;
  description: string;
}

const initialValues = {
  name: "",
  description: "",
};

export function CreateActivityModal({
  open,
  setOpen,
}: CreateActivityModalProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<FormData>["setFieldValue"]
  ) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleSubmit = async (
    values: FormData,
    resetForm: FormikHelpers<FormData>["resetForm"]
  ) => {
    try {
      const projectId = "PgwbCyMAeN300VU1LcsY";
      const activitiesRef = collection(
        firestore,
        "projects",
        projectId,
        "activities"
      );
      const activityRef = doc(activitiesRef);
      const activityId = activityRef.id;
      const activitySnap = await getDoc(activityRef);
      if (!activitySnap.exists()) {
        await setDoc(activityRef, {
          ...values,
          id: activityId,
        });
      }

      setOpen(null);
      resetForm();
      alert("Dodano czynność");
    } catch (error) {
      resetForm();
      alert("Wystąpił błąd");
    }
  };

  const handleClose = (resetForm: FormikHelpers<FormData>["resetForm"]) => {
    setOpen(null);
    resetForm();
  };
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
                        value={values.name}
                        onChange={(e) => handleInputChange(e, setFieldValue)}
                        name="name"
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
  );
}
