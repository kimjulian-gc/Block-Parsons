import { Box, Stack, Grid } from "@mui/material";
import { ArgumentSlot } from "./ArgumentSlot.tsx";
import { throwNull } from "../common/utils.ts";
import { PresentationalArgumentSlot } from "./PresentationalArgumentSlot.tsx";
import { useDndContext } from "@dnd-kit/core";
import { useBlockContext } from "../common/providers/block/BlockContext.ts";

export interface BlockProps {
  id: string;
  presentational?: boolean;
}

export function Block({ id, presentational: presentationalProp }: BlockProps) {
  const { blocks } = useBlockContext();
  const { childBlocks, name, argumentOptions } =
    blocks.get(id.toString()) ??
    throwNull(`attempted to render unknown block ${id}`);

  const { active } = useDndContext();
  const presentational = presentationalProp || active?.id === id.toString();
  

  // minBase is min number of arguments
  const minBase = argumentOptions?.minAmount ?? 0;
  // check if a block is expandable
  const expandable = argumentOptions?.expandable ?? false;
  // if a block is expandable, leave
  const minAmount = expandable ? minBase + 1 : minBase;
  const isConstant = minAmount === 0;
  const args = ((): (string | null)[] => {
    if (!childBlocks) {
      return Array.from({ length: minAmount });
    }
    if (childBlocks.length > minAmount) {
      return childBlocks;
    }
    return childBlocks.concat(
      Array.from({ length: minAmount - childBlocks.length }),
    );
  })();

  // console.log(args);
  // console.log(name, argumentOptions,args)

  return (
  <Stack
    width={"fit-content"}
    bgcolor={isConstant ? "lightgreen" : "lightgray"}
    padding={".5em"}
    borderRadius={".5em"}
    fontFamily={"monospace"}
    spacing={2}
    useFlexGap
  >
    <Stack
  direction="row"
  alignItems={
    args.some((arg) => arg !== null) ? "baseline" : "flex-start"
  }
  spacing={2}
>
  {isConstant ? null : "("}
  {name}

  {args.length > 0 && (
    <Stack spacing={2}>
      {presentational ? (
        <PresentationalArgumentSlot idSuffix={`${name}:${id}:0`} blockId={args[0]} />
      ) : (
        <ArgumentSlot idSuffix={`${name}:${id}:0`} blockId={args[0]} />
      )}
      {args.slice(1).map((blockId, index) => {
        const realIndex = index + 1;
        const idSuffix = `${name}:${id}:${realIndex}`;
        const propsToPass = { idSuffix, blockId };

        return presentational ? (
          <PresentationalArgumentSlot {...propsToPass} key={realIndex} />
        ) : (
          <ArgumentSlot {...propsToPass} key={realIndex} />
        );
      })}
      {!isConstant && <Box>)</Box>}
    </Stack>
  )}
</Stack>
  </Stack>
);
}
