import { Box, Stack, Typography } from "@mui/material"

interface HeadCellProps {
  date: string
  cellWidth: number
  columnIndex: number
  weekRange: string[]
}

export function HeadCell({
  date,
  cellWidth,
  columnIndex,
  weekRange,
}: HeadCellProps) {
  const renderWeek = (range: string[], columnIndex: number) => {
    const index = columnIndex % (range.length * 7)
    const label = range[Math.floor(index / 7)]
    if ((columnIndex % 7) - 1 == 0) {
      return label
    }
  }

  return (
    <Stack
      sx={{
        width: cellWidth,
        bgcolor: "#D9D9D9",
        boxSizing: "border-box",
        borderBottom: "1px solid black",
        userSelect: "none",
      }}
    >
      <Stack
        height="100%"
        width="100%"
        sx={{
          boxSizing: "border-box",
          borderRight: columnIndex % 7 === 0 ? "1px solid black" : "none",
          borderBottom: "1px solid black",
          pl: 1,
        }}
      >
        <Typography variant="body2" noWrap>
          {renderWeek(weekRange, columnIndex)}
        </Typography>
      </Stack>
      <Stack
        height="100%"
        justifyContent="center"
        sx={{ pl: 1, borderRight: "1px solid black" }}
      >
        <Typography variant="body2" noWrap>
          {date}
        </Typography>
      </Stack>
    </Stack>
  )
}
