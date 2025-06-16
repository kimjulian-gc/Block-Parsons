import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";
import type { ReactElement } from "react";
import type { ArgumentSlotProps } from "./ArgumentSlot.tsx";

export function PresentationalArgumentSlot({ blockProps }: ArgumentSlotProps) {
  const ChildBlock: ReactElement<BlockProps> | undefined = blockProps && (
    <Block {...blockProps} presentational={true} />
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
    >
      {ChildBlock ?? null}
    </Box>
  );
}
