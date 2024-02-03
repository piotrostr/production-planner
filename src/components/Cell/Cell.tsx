import { Stand } from "../../../types/stand"
import { DataCell, HeadCell, SideCell } from "../Cell"
import { CornerCell } from "../Cell/CornerCell"

interface CellProps {
  colIndex: number
  rowId: number
  cellStateMap: any
  draggedTask: any
  stands: Array<{ id: number } | Stand>
  view: any
  column: any
  width: number
}

export function Cell({
  colIndex,
  rowId,
  cellStateMap,
  draggedTask,
  stands,
  view,
  column,
  width,
}: CellProps) {
  const stand = stands[rowId - 1]
  const rowIndex = rowId
  if (rowIndex == 0 && colIndex == 0) {
    return <CornerCell />
  } else if (rowIndex == 0 && colIndex != 0) {
    return (
      <HeadCell
        cellWidth={width}
        columnIndex={colIndex}
        topData={view?.headerTopData}
        bottomLabel={column.headerName}
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
        cellWidth={width}
      />
    )
  }
}
