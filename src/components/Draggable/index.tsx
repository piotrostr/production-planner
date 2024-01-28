import { useDraggable } from "@dnd-kit/core"

interface DraggableProps {
  children: React.ReactNode
  id: number
  scroll: { x: number; y: number }
}

export function Draggable({ children, id, scroll }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, over } = useDraggable({
    id: id,
  })
  console.log(over)
  const style = transform
    ? {
        position: "absolute",
        transform: over
          ? `translate3d(${transform.x - scroll.x}px, ${
              transform.y - scroll.y
            }px, 0)`
          : `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        cursor: "grabbing",
      }
    : undefined

  return (
    <button
      ref={setNodeRef}
      style={{ all: "unset", cursor: "grab", ...style }}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  )
}
