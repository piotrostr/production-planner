export interface View {
  name: string
  headerTopData: string[]
  headerBottomData: {
    field: string
    headerName: string
    date: Date
    editable: boolean
    sortable: boolean
    width: number
    minWidth: number
  }[]
  cellWidth: number
}
