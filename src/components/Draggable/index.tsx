import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  children: React.ReactNode;
  id: number;
}

export function Draggable({ children, id }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        position: "absolute",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        cursor: "grabbing",
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={{ all: "unset", cursor: "grab", ...style }}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
