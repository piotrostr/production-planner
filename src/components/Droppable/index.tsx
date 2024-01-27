import { useDroppable } from "@dnd-kit/core"

interface DroppableProps {
  children: React.ReactNode
  id: string
}

export function Droppable({ children, id }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  })

  return <div ref={setNodeRef}>{children}</div>
}
