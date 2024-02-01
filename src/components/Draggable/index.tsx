import { useDraggable } from "@dnd-kit/core"
interface DraggableProps {
  children: React.ReactNode
  id: string
  data: any
}

export function Draggable({ children, id, data }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: data,
  })

  const style = transform
    ? {
        position: "fixed",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        cursor: "none",
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
