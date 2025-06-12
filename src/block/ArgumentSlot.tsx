import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";
import { useDroppable } from "@dnd-kit/core";

interface ArgumentSlotProps {
  idSuffix: string;
  parentId: string;
  blockProps?: BlockProps;
}

export function ArgumentSlot({
  idSuffix,
  blockProps,
  parentId,
}: ArgumentSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `argument-slot-${idSuffix};${parentId}`,
  });

  return (
    <Box
      width={"fit-content"}
      minWidth={"2em"}
      minHeight={"0.25em"}
      bgcolor={"white"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      marginLeft={"1em"}
      aria-label={BlockLabels.ArgumentSlot}
      ref={setNodeRef}
      {...(isOver ? { border: "solid lightgreen" } : null)}
    >
      {blockProps ? <Block {...blockProps} /> : null}
    </Box>
  );
}
