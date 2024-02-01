import { Button, Typography } from "@mui/material";

interface SecondaryButtonProps {
  width?: string | number;
  height?: string | number;
  px?: number;
  py?: number;
  fontVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "button";
  fontWeight?: number;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function SecondaryButton({
  width = "100%",
  height = "fit-content",
  px = 10,
  py = 2,
  fontVariant = "body1",
  fontWeight = 500,
  label,
  onClick,
}: SecondaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        px: px,
        py: py,
        borderColor: "#5A5A5A",
        bgcolor: "#FFFFFF",
        color: "#1E1E1E",
        width: width,
        height: height,
        "&:hover": {
          bgcolor: "#1E1E1E",
          borderColor: "#1E1E1E",
          color: "#FFFFFF",
        },
      }}
    >
      <Typography variant={fontVariant} fontWeight={fontWeight}>
        {label}
      </Typography>
    </Button>
  );
}
