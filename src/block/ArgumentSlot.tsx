import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "./dnd/Draggable.tsx";

interface ArgumentSlotProps {
  idSuffix: string;
  blockProps?: BlockProps;
}

export function ArgumentSlot({ idSuffix, blockProps }: ArgumentSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `argument-slot-${idSuffix}`,
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
      {...(isOver ? { boxShadow: "inset 0 0 0 0.25em lightgreen" } : null)}
    >
      {blockProps ? (
        <Draggable id={blockProps.id}>
          <Block {...blockProps} />{" "}
        </Draggable>
      ) : null}
    </Box>
  );
}
