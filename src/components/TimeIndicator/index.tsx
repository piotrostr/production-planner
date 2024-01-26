import { Box, Stack } from "@mui/material";

function BottomTriangle() {
  const triangleStyle = {
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    transform: "translateY(-3px)",
  };

  return <div style={triangleStyle}></div>;
}

function TopTriangle() {
  const triangleStyle = {
    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    transform: "translateY(3px)",
  };

  return <div style={triangleStyle}></div>;
}

export function TimeIndicator(height, bottom) {
  return (
    <Stack
      alignItems="center"
      width="10px"
      position="absolute"
      zIndex={1}
      bottom={bottom}
      left="30%"
    >
      <TopTriangle />
      <Box
        sx={{
          height: height,
          width: "2px",
          backgroundColor: "red",
        }}
      />
      <BottomTriangle />
    </Stack>
  );
}
