export function SideCell({ style, stands, rowIndex }) {
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
      {stands[rowIndex - 1]?.title}
    </div>
  )
}
