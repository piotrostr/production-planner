import React from "react"
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material"

interface GroupedData {
  date: Date
  groupedHours: number[]
}

interface WeekData {
  weekNumber: number
  dates: Date[]
}

const ProductionSchedule: React.FC = () => {
  const shipyardAreas: string[] = ["Area A", "Area B", "Area C"]
  const numberOfDays: number = 20

  const generateDateRange = (numberOfDays: number): Date[] => {
    const currentDate = new Date()
    const dateRange = Array.from({ length: numberOfDays }, (_, index) => {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + index)
      return date
    })
    return dateRange
  }

  const dateRange: Date[] = generateDateRange(numberOfDays)

  const groupDaysAndHours = (dateRange: Date[]): GroupedData[] => {
    const groupedData: GroupedData[] = []
    dateRange.forEach((date) => {
      const groupedHours = Array.from({ length: 24 }, (_, index) => index)
      groupedData.push({ date, groupedHours })
    })
    return groupedData
  }

  const groupedData: GroupedData[] = groupDaysAndHours(dateRange)

  const getISOWeek = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const diff = date.getTime() - startOfYear.getTime()
    const oneWeek = 7 * 24 * 60 * 60 * 1000
    return Math.ceil(diff / oneWeek)
  }

  const groupDaysByWeek = (dateRange: Date[]): WeekData[] => {
    const groupedData: WeekData[] = []
    dateRange.forEach((date) => {
      const weekNumber = getISOWeek(date)
      const existingWeek = groupedData.find(
        (group) => group.weekNumber === weekNumber
      )

      if (existingWeek) {
        existingWeek.dates.push(date)
      } else {
        groupedData.push({ weekNumber, dates: [date] })
      }
    })
    return groupedData
  }

  const weeksData: WeekData[] = groupDaysByWeek(dateRange)

  const numRowsToFill = 30

  const fillEmptyRows = () => {
    const emptyRows = []
    for (let i = 0; i < numRowsToFill; i++) {
      emptyRows.push(
        <TableRow key={`empty-row-${i}`}>
          <TableCell></TableCell>
          {groupedData.map((day) =>
            day.groupedHours.map((hour) => (
              <TableCell
                key={`empty-cell-${i}-${day.date}-${hour}`}
              ></TableCell>
            ))
          )}
        </TableRow>
      )
    }
    return emptyRows
  }

  return (
    <TableContainer
      sx={{
        scrollbarWidth: "thin",
        scrollbarColor: "#333333 #EFEFEF",
        position: "relative",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          width: "100%",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#5A5A5A",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#D9D9D9",
          borderTop: "1px solid #000000",
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                position: "sticky",
                left: 0,
                padding: 0,
                zIndex: 1,
                minWidth: "10rem",
                borderBottom: "none", // Remove bottom border for the header
              }}
            >
              <Box>elo</Box>
            </TableCell>
            {weeksData.map((week) => (
              <TableCell
                colSpan={24 * 7}
                key={week.weekNumber}
                sx={{
                  minWidth: "10rem",
                  textAlign: "left",
                  padding: 0,
                  position: "sticky",
                  left: "10rem",
                  background: "#fff",
                  zIndex: 1,
                  borderBottom: "none", // Remove bottom border for the header
                }}
              >
                <Box
                  sx={{
                    paddingLeft: "8px",
                    borderBottom: "1px solid black",
                    borderLeft: "1px solid black",
                  }}
                >
                  Week {week.weekNumber}
                </Box>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell
              style={{
                padding: 0,
                position: "sticky",
                left: 0,
                background: "#fff",
                zIndex: 1,
                minWidth: "10rem",
                borderBottom: "none", // Remove bottom border for the header
              }}
            >
              <Box>elo</Box>
            </TableCell>
            {groupedData.map((day, index) => (
              <React.Fragment key={index}>
                <TableCell
                  colSpan={24}
                  sx={{
                    textAlign: "left",
                    padding: 0,
                    position: "sticky",
                    left: "10rem",
                    background: "#fff",
                    zIndex: 1,
                    borderBottom: "none", // Remove bottom border for the header
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: "8px",
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    {day.date.toLocaleDateString()}
                  </Box>
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
          <TableRow>
            <TableCell
              style={{
                padding: 0,
                position: "sticky",
                left: 0,
                background: "#fff",
                zIndex: 1,
                minWidth: "10rem",
                borderBottom: "none", // Remove bottom border for the header
              }}
            >
              <Box>elo</Box>
            </TableCell>
            {groupedData.map((day) =>
              day.groupedHours.map((hour) => (
                <TableCell
                  key={`${day.date}-${hour}`}
                  sx={{
                    background: "#fff",
                    position: "sticky",
                    left: "10rem",
                    minWidth: "10rem",
                    textAlign: "left",
                    padding: 0,
                    zIndex: 1,
                    borderBottom: "none",
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: "8px",
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    {hour}:00
                  </Box>
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {shipyardAreas.map((area) => (
            <TableRow key={area}>
              <TableCell
                style={{
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                  zIndex: 1,
                  padding: 0,
                  borderBottom: "none",
                }}
              >
                <Box
                  sx={{
                    borderBottom: "1px solid black",
                    borderRight: "1px solid black",
                  }}
                >
                  {area}
                </Box>
              </TableCell>
              {groupedData.map((day) =>
                day.groupedHours.map((hour) => (
                  <TableCell
                    key={`${area}-${day.date}-${hour}`}
                    sx={{ padding: 0 }}
                  >
                    {/* Your content for each cell */}
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
        {fillEmptyRows()}
      </Table>
    </TableContainer>
  )
}

export default ProductionSchedule
