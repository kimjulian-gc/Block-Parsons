import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "./dnd/Draggable.tsx";
import type { ReactElement } from "react";

interface ArgumentSlotProps {
  idSuffix: string;
  blockProps?: BlockProps;
  presentational?: boolean;
}

export function ArgumentSlot({
  idSuffix,
  blockProps,
  presentational,
}: ArgumentSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `argument-slot-${idSuffix}`,
  });

  const ChildBlock: ReactElement<BlockProps> | undefined = blockProps && (
    <Block {...blockProps} />
  );
  return (
    <Box
      width={"fit-content"}
      minWidth={"2em"}
      minHeight={"0.5em"}
      bgcolor={"white"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      marginLeft={"1em"}
      aria-label={BlockLabels.ArgumentSlot}
      ref={setNodeRef}
      {...(isOver ? { boxShadow: "inset 0 0 0 0.25em lightgreen" } : null)}
    >
      {ChildBlock ? (
        presentational ? (
          ChildBlock
        ) : (
          <Draggable id={ChildBlock.props.id}>{ChildBlock}</Draggable>
        )
      ) : null}
    </Box>
  );
}
