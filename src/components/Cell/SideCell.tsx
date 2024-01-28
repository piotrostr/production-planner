import { Stand } from "../Stand";

export function SideCell({ style, stands, rowIndex }) {
  return (
    <div
      style={{
        ...style,
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRight: "1px solid black",
        borderBottom: "1px solid black",
        height: 50,
      }}
    >
      <Stand stand={stands[rowIndex - 1]} />
    </div>
  );
}
