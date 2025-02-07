import { useEffect, useState } from "react"
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro"
import { Stand } from "../../../types/stand"
import { Cell } from "../Cell/Cell"

interface DataGridProps {
  stands: Array<{ id: number } | Stand>
  cellStateMap: any
  draggedTask: any
  view: any
}

export function DataGrid({
  stands,
  cellStateMap,
  draggedTask,
  view,
}: DataGridProps) {
  const [cellWidth, setCellWidth] = useState<number>(100)
  const apiRef = useGridApiRef()

  const handleZoom = (event: WheelEvent) => {
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

  return (
    <DataGridPro
      apiRef={apiRef}
      rows={stands}
      columns={view?.headerBottomData || []}
      disableColumnFilter
      disableColumnMenu
      disableRowSelectionOnClick
      disableColumnSelector
      disableDensitySelector
      disableMultipleRowSelection
      hideFooter
      rowHeight={50}
      columnBuffer={5}
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
        cell: Cell,
      }}
      slotProps={{
        cell: {
          cellStateMap: cellStateMap,
          draggedTask: draggedTask,
          view: view,
          stands: stands,
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
