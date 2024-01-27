export function DataCell({ style, columnIndex, rowIndex }) {
  return (
    <div
      style={{
        ...style,
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      {rowIndex}:{columnIndex}
    </div>
  )
}
