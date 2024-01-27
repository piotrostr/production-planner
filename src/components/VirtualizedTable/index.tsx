import React from "react"

import { StickyGrid } from "../StickyGrid"
import { Stand } from "../../../types/stand"

interface CellProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
}

interface VirtualizedTableProps {
  stands: Stand[]
}

export const VirtualizedTable = ({ stands }: VirtualizedTableProps) => {
  const Cell = ({ columnIndex, rowIndex, style }: CellProps) => {
    //first col except first row
    if (columnIndex == 0 && rowIndex != 0) {
      return (
        <div
          style={{
            ...style,
            backgroundColor: "white",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          {stands[rowIndex - 1]?.title}
        </div>
      )
    }
    //first row except first col
    if (rowIndex == 0) {
      return (
        <div
          style={{
            ...style,
          }}
        >
          {columnIndex == 0 ? (
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
                color: "transparent",
                backgroundColor: "white",
                marginRight: "-1px",
              }}
            >
              /
            </div>
          ) : (
            <div
              style={{
                width: "100px",
                backgroundColor: "white",
                transform: "translateX(1px)",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
              }}
            >
              header cell
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div
          style={{
            ...style,
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            transform: `translateY(${rowIndex - 1}px)`,
          }}
        >
          elo
        </div>
      )
    }
  }

  return (
    <StickyGrid
      columnCount={1000}
      columnWidth={() => 100}
      height={1000}
      rowCount={stands?.length + 1}
      rowHeight={() => 100}
      width={window.innerWidth}
    >
      {Cell}
    </StickyGrid>
  )
}
