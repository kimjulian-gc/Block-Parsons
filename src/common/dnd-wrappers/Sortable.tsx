import type { PropsWithChildren } from "react";
import type { DragDropProps } from "./dnd-props.ts";
import { useSortable } from "@dnd-kit/sortable";
import { Box } from "@mui/material";

export function Sortable({ id, children }: PropsWithChildren<DragDropProps>) {
  const { attributes, listeners, setNodeRef, transition, isDragging } =
    useSortable({
      id,
    });

  return (
    <Box
      width={"fit-content"}
      ref={setNodeRef}
      sx={{
        transition,
        opacity: isDragging ? 0 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </Box>
  );
}
