import { useDroppable } from "@dnd-kit/core"
import { Stack } from "@mui/material"

interface DroppableProps {
  children: React.ReactNode
  id: string
}

export function Droppable({ children, id }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  })

  return (
    <Stack
      justifyContent="center"
      ref={setNodeRef}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </Stack>
  )
}
