const getWeek = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const diff = date.getTime() - startOfYear.getTime()
  const oneWeek = 7 * 24 * 60 * 60 * 1000
  return Math.ceil(diff / oneWeek)
}

const getMonth = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" })
  return month.charAt(0).toUpperCase() + month.slice(1)
}

const getYear = (date: Date): number => {
  return date.getFullYear()
}

export const generateMonthView = (numberOfColumns: number) => {
  const numOfCellsInViewport = 30
  const cellWidth = (window.innerWidth - 225) / numOfCellsInViewport

  const headerBottomData = [
    {
      field: "stand",
      headerName: "",
      date: new Date(),
      editable: false,
      sortable: false,
      width: 225,
      minWidth: 225,
    },
  ]

  headerBottomData.push(
    ...Array.from({ length: numberOfColumns }, (_, i) => {
      const date = new Date()
      date.setDate(i + 1)
      return {
        field: "date" + i,
        headerName: date.toLocaleDateString("pl-Pl"),
        date: date,
        editable: false,
        sortable: false,
        width: cellWidth,
        minWidth: cellWidth,
      }
    })
  )
  const headerTopData = headerBottomData.map((date) => {
    const week = getWeek(date.date)
    return "Tydzień " + week
  })

  return {
    name: "1 mies.",
    headerTopData,
    headerBottomData,
    cellWidth,
  }
}

export const generateQuarterYearView = (numberOfColumns: number) => {
  const numOfCellsInViewport = 13 // maximum is 12
  const cellWidth = (window.innerWidth - 225) / numOfCellsInViewport
  const headerBottomData = [
    {
      field: "stand",
      headerName: "",
      date: new Date(),
      editable: false,
      sortable: false,
      width: 225,
      minWidth: 225,
    },
  ]

  headerBottomData.push(
    ...Array.from({ length: numberOfColumns }, (_, i) => {
      const dateStart = new Date()
      dateStart.setDate(i + 1 + 7 * i)
      return {
        field: "date" + i,
        headerName: dateStart.toLocaleDateString("pl-Pl"),
        date: dateStart,
        editable: false,
        sortable: false,
        width: cellWidth,
        minWidth: cellWidth,
      }
    })
  )
  const headerTopData = headerBottomData.map((date) => {
    const month = getMonth(date.date)
    return month
  })

  return {
    name: "3 mies.",
    headerTopData,
    headerBottomData,
    cellWidth,
  }
}

export const generateYearView = (numberOfColumns: number) => {
  const numOfCellsInViewport = 12 // maximum is 12
  const cellWidth = (window.innerWidth - 225) / numOfCellsInViewport
  const headerBottomData = [
    {
      field: "stand",
      headerName: "",
      date: new Date(),
      editable: false,
      sortable: false,
      width: 225,
      minWidth: 225,
    },
  ]

  headerBottomData.push(
    ...Array.from({ length: numberOfColumns }, (_, i) => {
      const date = new Date()
      date.setMonth(i)
      return {
        field: "date" + i,
        headerName: getMonth(date),
        date: date,
        editable: false,
        sortable: false,
        width: cellWidth,
        minWidth: cellWidth,
      }
    })
  )
  const headerTopData = headerBottomData.map((date) => {
    const year = getYear(date.date)
    return `${year}`
  })

  return {
    name: "1 rok",
    headerTopData,
    headerBottomData,
    cellWidth,
  }
}
