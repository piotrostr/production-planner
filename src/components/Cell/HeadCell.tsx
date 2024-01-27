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
      return <Typography>{label}</Typography>
    } else {
      return <Typography sx={{ color: "transparent" }}>/</Typography>
    }
  }

  return (
    <div
      style={{
        ...style,
        backgroundColor: "white",
      }}
    >
      {columnIndex == 0 ? (
        <Box
          height="100%"
          width="100%"
          sx={{
            boxSizing: "border-box",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
            color: "transparent",
          }}
        >
          /
        </Box>
      ) : (
        <Stack
          sx={{
            width: "100%",
            height: 100,
            bgcolor: "white",
          }}
        >
          <Box
            height="100%"
            sx={{
              boxSizing: "border-box",
              borderBottom: "1px solid black",
              //display right border every 7 * 24 * 4th column
              borderRight:
                columnIndex % (7 * 24 * 4) == 0 ? "1px solid black" : "",
            }}
          >
            {renderLabel(weekRange, columnIndex, 24 * 7 * 4)}
          </Box>
          <Box
            height="100%"
            sx={{
              boxSizing: "border-box",
              borderBottom: "1px solid black",
              //display right border every 24 * 4th column
              borderRight: columnIndex % (24 * 4) == 0 ? "1px solid black" : "",
            }}
          >
            {renderLabel(dateRange, columnIndex, 24 * 4)}
          </Box>
          <Box
            height="100%"
            sx={{
              boxSizing: "border-box",
              //display right border every 4th column
              borderRight: columnIndex % 1 == 0 ? "1px solid black" : "",
              borderBottom: "1px solid black",
            }}
          >
            {
              //display hour every 4th column
            }
            {renderLabel(hourRange, columnIndex, 4)}
          </Box>
        </Stack>
      )}
    </div>
  )
}
