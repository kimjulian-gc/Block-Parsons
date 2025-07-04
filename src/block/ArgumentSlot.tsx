import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "../common/dnd-wrappers/Draggable.tsx";
import type { ReactElement } from "react";

export interface ArgumentSlotProps {
  idSuffix: string;
  blockId?: string | null;
}

export const ArgumentSlotPrefix = "argument slot of ";

export function ArgumentSlot({ idSuffix, blockId }: ArgumentSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${ArgumentSlotPrefix}${idSuffix}`,
  });

  const ChildBlock: ReactElement<BlockProps> | null = !blockId ? null : (
    <Block id={blockId} />
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
      aria-label={BlockLabels.PresentationalArgumentSlot}
      ref={setNodeRef}
      {...(isOver
        ? {
            boxShadow: "inset 0 0 0 0.25em lightgreen",
          }
        : null)}
    >
      {ChildBlock ? (
        <Draggable id={ChildBlock.props.id}>{ChildBlock}</Draggable>
      ) : null}
    </Box>
  );
}
