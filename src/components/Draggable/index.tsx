import { useDraggable } from "@dnd-kit/core"
interface DraggableProps {
  children: React.ReactNode
  id: string
  scroll: { x: number; y: number }
  data: any
}

export function Draggable({ children, id, scroll, data }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, over, active } =
    useDraggable({
      id: id,
      data: data,
    })

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
    <>
      <button
        ref={setNodeRef}
        style={{ all: "unset", cursor: "grab", ...style }}
        {...listeners}
        {...attributes}
      >
        {children}
      </button>
    </>
  )
}
