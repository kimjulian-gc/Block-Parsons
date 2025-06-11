import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { ArgumentSlot } from "./ArgumentSlot.tsx";

interface ArgumentOptions {
  minAmount: number;
  expandable?: boolean;
}

export interface BlockProps {
  name: string;
  argumentOptions?: ArgumentOptions;
  // TODO: i don't like this implementation of child
  //  blocks, ideally i'd like child elements
  childBlocks?: BlockProps[];
}

export function Block({ name, argumentOptions, childBlocks }: BlockProps) {
  const { minAmount } = argumentOptions ?? { minAmount: 0 };
  const isConstant = minAmount === 0;
  const [args] = useState<(BlockProps | undefined)[]>(() => {
    if (!childBlocks) {
      return Array.from({ length: minAmount });
    }
    if (childBlocks.length > minAmount) {
      return childBlocks;
    }
    return childBlocks.concat(
      Array.from({ length: minAmount - childBlocks.length }),
    );
  });

  return (
    <Stack
      width={"fit-content"}
      bgcolor={isConstant ? "lightgreen" : "lightgray"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      fontFamily={"monospace"}
      spacing={1}
      useFlexGap
    >
      {isConstant ? null : "("}
      {name}
      {args.map((blockProps, index) =>
        index === args.length - 1 ? (
          <Stack direction={"row"} alignItems={"flex-end"} key={index}>
            <ArgumentSlot blockProps={blockProps} />{" "}
            <Box marginLeft={"0.25em"} marginBottom={"1em"}>
              )
            </Box>
          </Stack>
        ) : (
          <ArgumentSlot blockProps={blockProps} key={index} />
        ),
      )}
    </Stack>
  );
}
