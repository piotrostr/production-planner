import { Box, Stack, Typography } from "@mui/material"

interface HeadCellProps {
  style: React.CSSProperties
  columnIndex: number
  rowIndex: number
  hourRange: number[]
  dateRange: Date[]
  weekRange: number[]
}

export function HeadCell({
  style,
  columnIndex,
  rowIndex,
  hourRange,
  dateRange,
  weekRange,
}: HeadCellProps) {
  const renderHour = (hourRange: number[], columnIndex: number) => {
    const index = columnIndex % (hourRange.length * 4)
    const hour = hourRange[Math.floor(index / 4)]
    if ((columnIndex % 4) + -1 == 0) {
      return <Typography>{hour + ":00"}</Typography>
    } else {
      return <Typography sx={{ color: "transparent" }}>/</Typography>
    }
  }

  const renderDate = (dateRange: Date[], columnIndex: number) => {
    const index = columnIndex % (hourRange.length * 24 * 4)
    const date = dateRange[Math.floor(index / (24 * 4))]
    if ((columnIndex % (24 * 4)) + -1 == 0) {
      return <Typography>{date.toLocaleDateString()}</Typography>
    } else {
      return <Typography sx={{ color: "transparent" }}>/</Typography>
    }
  }

  const renderWeek = (weekRange: number[], columnIndex: number) => {
    const index = columnIndex % (hourRange.length * 24 * 7 * 4)
    const week = weekRange[Math.floor(index / (24 * 7 * 4))]
    if ((columnIndex % (24 * 7 * 4)) + -1 == 0) {
      return <Typography>{"Week " + week}</Typography>
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
            {renderWeek(weekRange, columnIndex)}
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
            {renderDate(dateRange, columnIndex)}
          </Box>
          <Box
            height="100%"
            sx={{
              boxSizing: "border-box",
              //display right border every 4th column
              borderRight: columnIndex % 4 == 0 ? "1px solid black" : "",
              borderBottom: "1px solid black",
            }}
          >
            {
              //display hour every 4th column
            }
            {renderHour(hourRange, columnIndex)}
          </Box>
        </Stack>
      )}
    </div>
  )
}
