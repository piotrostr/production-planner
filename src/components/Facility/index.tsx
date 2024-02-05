import { Stack, Typography } from "@mui/material"
import { Facility as FacilityType } from "../../slices/facilities"

interface FacilityProps {
  facility: FacilityType
}

export function Facility({ facility }: FacilityProps) {
  return (
    <Stack
      justifyContent="center"
      height="100%"
      px={3}
      sx={{
        bgcolor: facility.bgcolor,
        color: "#FFFFFF",
      }}
    >
      <Typography variant="body2" color="#1E1E1E" fontWeight={600}>
        {facility.title}
      </Typography>
    </Stack>
  )
}
