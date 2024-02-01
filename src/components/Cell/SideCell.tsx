import { Stand } from "../Stand"

export function SideCell({ stand }) {
  return (
    <div
      style={{
        width: 225,
        backgroundColor: stand.bgcolor,
        boxSizing: "border-box",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      <Stand stand={stand} />
    </div>
  )
}
