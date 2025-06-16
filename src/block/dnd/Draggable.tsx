import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";
import type { DragDropProps } from "./dnd-props.ts";

export function Draggable({ id, children }: PropsWithChildren<DragDropProps>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform: dragTransform,
  } = useDraggable({
    id,
  });
  const transform = CSS.Translate.toString(dragTransform);

  return (
    <Box ref={setNodeRef} sx={{ transform }} {...attributes} {...listeners}>
      {children}
    </Box>
  );
}
