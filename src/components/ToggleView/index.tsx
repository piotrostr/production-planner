import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import {
  generateQuarterYearView,
  generateMonthView,
  generateYearView,
} from "../../generateView"
import { View } from "../../../types/view"
import { ChangeEventHandler } from "react"

interface ToggleViewProps {
  view: View
  setView: React.Dispatch<React.SetStateAction<View>>
}

export function ToggleView({ view, setView }: ToggleViewProps) {
  const handleChange = (event: ChangeEventHandler<string>, newView: string) => {
    switch (newView) {
      case "year":
        setView(generateYearView(24))
        break
      case "3months.":
        setView(generateQuarterYearView(46))
        break
      case "1month.":
        setView(generateMonthView(365))
        break
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
