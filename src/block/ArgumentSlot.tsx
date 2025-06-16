import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "./dnd/Draggable.tsx";
import type { ReactElement } from "react";

export interface ArgumentSlotProps {
  idSuffix: string;
  blockProps?: BlockProps;
}

export function ArgumentSlot({ idSuffix, blockProps }: ArgumentSlotProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: `argument-slot-${idSuffix}`,
  });

  const ChildBlock: ReactElement<BlockProps> | undefined = blockProps && (
    <Block {...blockProps} />
  );
  return (
    <Box
      width={"fit-content"}
      minWidth={!ChildBlock ? "2em" : "fit-content"}
      minHeight={!ChildBlock ? "0.5em" : "fit-content"}
      bgcolor={"white"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      marginLeft={"1em"}
      aria-label={BlockLabels.ArgumentSlot}
      ref={setNodeRef}
      {...(isOver
        ? {
            boxShadow: "inset 0 0 0 0.25em lightgreen",
            width: active?.rect.current.initial?.width,
            height: active?.rect.current.initial?.height,
          }
        : null)}
    >
      {ChildBlock ? (
        <Draggable id={ChildBlock.props.id}>{ChildBlock}</Draggable>
      ) : null}
    </Box>
  );
}
