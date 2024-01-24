import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack, Typography } from "@mui/material";

interface toolbarIconProps {
  icon: React.ReactNode;
  iconText?: string;
  expandMore?: boolean;
}

export function ToolbarIcon({ icon, iconText, expandMore }: toolbarIconProps) {
  return (
    <Stack direction="row" spacing={1} px="1rem">
      {icon}
      <Typography variant="body1">{iconText}</Typography>
      {expandMore ? <ExpandMoreIcon /> : null}
    </Stack>
  );
}
