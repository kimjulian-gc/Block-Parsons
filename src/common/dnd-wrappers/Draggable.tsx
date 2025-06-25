import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";
import type { DragDropProps } from "./dnd-props.ts";

export function Draggable({ id, children }: PropsWithChildren<DragDropProps>) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });
  return (
    <Box
      width={"fit-content"}
      ref={setNodeRef}
      sx={{
        opacity: isDragging ? 0 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </Box>
  );
}
