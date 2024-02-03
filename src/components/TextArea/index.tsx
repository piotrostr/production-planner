import { InputBase, Stack } from "@mui/material";

interface TextAreaProps {
  placeholder: string;
  value?: string;
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function TextArea({ placeholder, name, onChange }: TextAreaProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        width: 400,
        border: "1px solid black",
      }}
    >
      <InputBase
        sx={{ mx: 3, my: 1, flex: 1 }}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        multiline
        minRows={5}
      />
    </Stack>
  );
}
