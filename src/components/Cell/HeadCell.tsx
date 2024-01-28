import { Box, Stack, Typography } from "@mui/material"

interface HeadCellProps {
  style: React.CSSProperties
  columnIndex: number
  rowIndex: number
  hourRange: string[]
  dateRange: string[]
  weekRange: string[]
}

export function HeadCell({
  style,
  columnIndex,
  rowIndex,
  hourRange,
  dateRange,
  weekRange,
}: HeadCellProps) {
  const renderLabel = (range: string[], columnIndex: number, span: number) => {
    const index = columnIndex % (range.length * span)
    const label = range[Math.floor(index / span)]
    if ((columnIndex % span) - 1 == 0) {
      return <Typography paddingLeft="1rem">{label}</Typography>
    } else {
      return <Typography sx={{ color: "transparent" }}>/</Typography>
    }
  }

  return (
    <div
      style={{
        ...style,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: 100,
          bgcolor: "#D9D9D9",
          boxSizing: "border-box",
        }}
      >
        <Stack
          height="100%"
          justifyContent="center"
          color="#1E1E1E"
          sx={{
            boxSizing: "content-box",
            borderBottom: columnIndex != 0 ? "1px solid black" : "",
            //display right border every 7 * 24 * 4th column
            borderRight:
              columnIndex % (7 * 24 * 4) == 0 ? "1px solid black" : "",
          }}
        >
          {renderLabel(weekRange, columnIndex, 24 * 7 * 4)}
        </Stack>
        <Box
          height="100%"
          color="#1E1E1E"
          sx={{
            //display right border every 24 * 4th column
            borderRight: columnIndex % (24 * 4) == 0 ? "1px solid black" : "",
          }}
        >
          <Stack
            justifyContent="center"
            style={{
              borderBottom: columnIndex != 0 ? "1px solid black" : "",
              height: "100%",
            }}
          >
            {renderLabel(dateRange, columnIndex, 24 * 4)}
          </Stack>
        </Box>
        <Stack
          height="100%"
          justifyContent="center"
          color="#1E1E1E"
          sx={{
            //display right border every 4th column
            borderRight: columnIndex % 4 == 0 ? "1px solid black" : "",
            borderBottom: "1px solid black",
          }}
        >
          {
            //display hour every 4th column
          }
          {renderLabel(hourRange, columnIndex, 4)}
        </Stack>
      </Stack>
    </div>
  )
}
