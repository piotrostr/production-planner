import { Facility as FacilityType } from "../../slices/facilities"
import { Facility } from "../Facility"

interface SideCellProps {
  facility: FacilityType
}

export function SideCell({ facility }: SideCellProps) {
  return (
    <div
      style={{
        width: 225,
        backgroundColor: facility.bgcolor,
        boxSizing: "border-box",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      <Facility facility={facility} />
    </div>
  )
}
