import React, { useEffect, useState } from "react"

import { StickyGrid } from "../StickyGrid"
import { Stand } from "../../../types/stand"
import { HeadCell, SideCell, DataCell } from "../Cell"

interface CellProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
}

interface VirtualizedTableProps {
  stands: Stand[]
}

export const VirtualizedTable = ({ stands }: VirtualizedTableProps) => {
  const [dateRange, setDateRange] = useState<Date[]>([])
  const [hourRange, setHourRange] = useState<number[]>([])
  const [weekRange, setWeekRange] = useState<number[]>([])
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

  const generateHourRange = (numberOfDays: number): number[] => {
    //return an array of repeated numbers from 0 to 23
    const hourRange = Array.from({ length: numberOfDays * 24 }, (_, index) => {
      return index % 24
    })
    return hourRange
  }

  const generateWeekRange = (numberOfDays: number): number[] => {
    const weekRange = Array.from(
      { length: numberOfDays },
      (_, index) => index + 1
    )
    return weekRange
  }

  useEffect(() => {
    const dateRange = generateDateRange(numberOfDays)
    const hourRange = generateHourRange(numberOfDays)
    const weekRange = generateWeekRange(numberOfDays)
    setDateRange(dateRange)
    setHourRange(hourRange)
    setWeekRange(weekRange)
  }, [])

  const renderCell = ({ columnIndex, rowIndex, style }: CellProps) => {
    //first col except first row
    if (columnIndex == 0 && rowIndex != 0) {
      return <SideCell style={style} stands={stands} rowIndex={rowIndex} />
    }
    //first row except first col
    if (rowIndex == 0) {
      return (
        <HeadCell
          style={style}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          hourRange={hourRange}
          dateRange={dateRange}
          weekRange={weekRange}
        />
      )
    } else {
      return (
        <DataCell style={style} columnIndex={columnIndex} rowIndex={rowIndex} />
      )
    }
  }

  return (
    <StickyGrid
      columnCount={dateRange?.length * 24 * 4 + 1}
      columnWidth={() => 100}
      height={1000}
      rowCount={stands?.length + 1}
      rowHeight={() => 100}
      width={window.innerWidth}
    >
      {renderCell}
    </StickyGrid>
  )
}
