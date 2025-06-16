import type { PropsWithChildren } from "react";
import type { DragDropProps } from "./dnd-props.ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

export function Sortable({ id, children }: PropsWithChildren<DragDropProps>) {
  // TODO: need presentational components
  const {
    attributes,
    listeners,
    setNodeRef,
    transform: dragTransform,
    transition,
  } = useSortable({
    id,
  });
  const transform = CSS.Translate.toString(dragTransform);

  return (
    <Box
      ref={setNodeRef}
      sx={{ transform, transition }}
      {...attributes}
      {...listeners}
    >
      {children}
    </Box>
  );
}
