import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";
import { Block, type BlockProps } from "./Block.tsx";

interface ArgumentSlotProps {
  blockProps?: BlockProps;
}

export function ArgumentSlot({ blockProps }: ArgumentSlotProps) {
  return (
    <Box
      width={"fit-content"}
      minWidth={"3em"}
      minHeight={"0.25em"}
      bgcolor={"white"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      marginLeft={"1em"}
      aria-label={BlockLabels.ArgumentSlot}
    >
      {blockProps ? <Block {...blockProps} /> : null}
    </Box>
  );
}
