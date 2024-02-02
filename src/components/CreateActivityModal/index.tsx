import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Stack, Typography } from "@mui/material";
import { TextField } from "../TextField";
import { Modal } from "../Modal";
import { TitleBar } from "../TitleBar";
import { TextArea } from "../TextArea";
import { SecondaryButton } from "../SecondaryButton";
import { PrimaryButton } from "../PrimaryButton";
import { useState } from "react";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase.config";

interface CreateActivityModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<null>>;
}

interface FormData {
  name: string;
  description: string;
}
const defaultValues = {
  name: "",
  description: "",
};

export function CreateActivityModal({
  open,
  setOpen,
}: CreateActivityModalProps) {
  const [formData, setFormData] = useState<FormData>(defaultValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
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
          ...formData,
          id: activityId,
        });
      }
      setOpen(null);
      setFormData(defaultValues);
      alert("Dodano czynność");
    } catch (error) {
      alert("Wystąpił błąd");
    }
  };

  const handleCancel = () => {
    setOpen(null);
    setFormData(defaultValues);
  };

  const handleClose = () => {
    setOpen(null);
    setFormData(defaultValues);
  };
  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Stack alignItems="center" justifyContent="center">
        <TitleBar onClose={() => handleClose()} />
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
                value={formData.name}
                onChange={handleInputChange}
                name="name"
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={5}>
              <Typography variant="body1">Opis*</Typography>
              <TextArea
                placeholder="Opis"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
              />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={5}>
            <SecondaryButton onClick={() => handleCancel()} label="Anuluj" />
            <PrimaryButton onClick={() => handleSave()} label="Zapisz" />
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}
