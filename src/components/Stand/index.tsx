import { Stand as StandType } from "../../../types/stand"
import { Stack, Typography } from "@mui/material"

interface StandProps {
  stand: StandType
}

export function Stand({ stand }: StandProps) {
  return (
    <Stack
      justifyContent="center"
      height="100%"
      px={3}
      sx={{
        bgcolor: stand.bgcolor,
        color: "#FFFFFF",
      }}
    >
      <Typography variant="body2" color="#1E1E1E" fontWeight={600}>
        {stand.title}
      </Typography>
    </Stack>
  )
}
