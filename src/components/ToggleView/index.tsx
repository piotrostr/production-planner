import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import {
  generateQuarterYearView,
  generateMonthView,
  generateYearView,
} from "../../generateView"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { setMonthView, setQuarterView } from "../../slices/view"

interface ToggleViewProps {}

export function ToggleView({}: ToggleViewProps) {
  const dispatch = useAppDispatch()
  const gridState = useAppSelector((state) => state.grid)
  const viewState = useAppSelector((state) => state.view)
  const cellStateMap = gridState.grid
  const view = viewState.view
  if (!view) return null

  const handleChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newView: string
  ) => {
    if (cellStateMap) {
      switch (newView) {
        case "year":
          null
          break
        case "3months.":
          dispatch(
            setQuarterView({
              view: generateQuarterYearView(1000),
              grid: cellStateMap,
            })
          )
          break
        case "1month.":
          dispatch(
            setMonthView({ view: generateMonthView(1000), grid: cellStateMap })
          )
          break
      }
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={view.name}
      exclusive
      aria-label="Platform"
      onChange={handleChange}
    >
      <ToggleButton value="year">1 rok</ToggleButton>
      <ToggleButton value="3months.">3 mies.</ToggleButton>
      <ToggleButton value="1month.">1 mies.</ToggleButton>
    </ToggleButtonGroup>
  )
}
