import { useEffect, useState } from "react"
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro"
import { DataCell, HeadCell, SideCell } from "../Cell"
import { Box, Stack } from "@mui/material"
import { CornerCell } from "../Cell/CornerCell"
import { Stand } from "../../../types/stand"

interface HeaderCell {
  field: string
  headerName: string
  width: number
  editable: boolean
  sortable: boolean
}

interface DataGridProps {
  stands: Stand[]
  cellStateMap: any
  draggedTask: any
}

export function DataGrid({ stands, cellStateMap, draggedTask }: DataGridProps) {
  const [dateRange, setDateRange] = useState<HeaderCell[]>([])
  const [weekRange, setWeekRange] = useState<string[]>([])
  const [cellWidth, setCellWidth] = useState<number>(100)
  const apiRef = useGridApiRef()
  const numberOfDays: number = 40

  const handleZoom = (event) => {
    // Check if the "Ctrl" key is pressed
    if (event.metaKey) {
      event.preventDefault()
      const minCellWidth = 50
      const maxCellWidth = 200
      // Zoom in
      if (event.deltaY < 0) {
        setCellWidth((cellWidth) =>
          cellWidth >= maxCellWidth ? cellWidth : cellWidth + 2
        )
      }
      // Zoom out
      if (event.deltaY > 0) {
        setCellWidth((cellWidth) =>
          cellWidth <= minCellWidth ? cellWidth : cellWidth - 2
        )
      }
    }
  }

  useEffect(() => {
    // Add event listener to the component when it mounts
    document.addEventListener("wheel", handleZoom, { passive: false })

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("wheel", handleZoom)
    }
  }, []) //

  const generateDateRange = (numberOfDays: number) => {
    const currentDate = new Date()
    const dateRange = Array.from({ length: numberOfDays }, (_, index) => {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + index)
      const dateString = date.toLocaleDateString("en-GB")
      return {
        field: "date" + index,
        headerName: dateString,
        editable: false,
        sortable: false,
        width: cellWidth,
      }
    })
    dateRange.unshift({
      field: "stand",
      headerName: "",
      editable: false,
      sortable: false,
      width: 225,
    })
    return dateRange
  }

  const generateWeekRange = (numberOfDays: number): string[] => {
    const weekRange = Array.from(
      { length: numberOfDays },
      (_, index) => index + 1
    ).map((week) => "Week " + week)
    return weekRange
  }

  useEffect(() => {
    const dateRange = generateDateRange(numberOfDays)
    const weekRange = generateWeekRange(numberOfDays)
    setDateRange(dateRange)
    setWeekRange(weekRange)
  }, [cellWidth])

  const renderCell = (rowIndex, colIndex, params) => {
    const stand = stands[rowIndex - 1]
    const date = params.column.headerName

    if (rowIndex == 0 && colIndex == 0) {
      return <CornerCell />
    } else if (rowIndex == 0 && colIndex != 0) {
      return (
        <HeadCell
          date={date}
          cellWidth={cellWidth}
          columnIndex={colIndex}
          weekRange={weekRange}
        />
      )
    } else if (rowIndex != 0 && colIndex == 0) {
      return <SideCell stand={stand} />
    } else {
      return (
        <DataCell
          columnIndex={colIndex}
          rowIndex={rowIndex}
          cellStateMap={cellStateMap}
          draggedTask={draggedTask}
          cellWidth={cellWidth}
        />
      )
    }
  }

  return (
    <DataGridPro
      apiRef={apiRef}
      rows={stands}
      columns={dateRange}
      disableColumnFilter
      disableColumnMenu
      disableRowSelectionOnClick
      disableColumnSelector
      disableDensitySelector
      disableMultipleRowSelection
      hideFooter
      rowHeight={50}
      pinnedRows={{
        top: [{ id: 0 }],
      }}
      initialState={{
        pinnedColumns: {
          left: ["stand"],
        },
      }}
      slots={{
        columnHeaders: () => null,
        cell: (params) => {
          const rowIndex = params.rowId
          const colIndex = params.colIndex
          return renderCell(rowIndex, colIndex, params)
        },
      }}
      sx={{
        //disable cell outline on focus
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
          width: "100%",
        },
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
          backgroundColor: "#D9D9D9", // track color
        },
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
          backgroundColor: "#5A5A5A",
        },
        height: "fit-content",
        border: "none",
        "& .MuiDataGrid-cell": {
          all: "unset",
          "&:focus": {
            all: "unset",
            outline: "none",
          },
        },
        //disable header cell outline on focus
        "& .MuiDataGrid-columnHeader": {
          all: "unset",
          "&:focus": {
            all: "unset",
            outline: "none",
          },
        },
      }}
    />
  )
}
