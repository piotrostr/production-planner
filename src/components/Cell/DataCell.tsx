import { Droppable } from "../Droppable"

export function DataCell({ style, columnIndex, rowIndex }) {
  return (
    <div
      style={{
        ...style,
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
        maxHeight: 50,
        marginTop: 50,
      }}
    >
      <Droppable id={`${columnIndex}-${rowIndex}`}>elo</Droppable>
    </div>
  )
}
