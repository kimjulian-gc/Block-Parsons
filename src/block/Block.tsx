import { Box, Stack } from "@mui/material";
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
      padding={"0.5em"}
      borderRadius={"0.5em"}
      fontFamily={"monospace"}
      spacing={1}
      useFlexGap
    >
      {isConstant ? null : "("}
      {name}
      {args.map((blockId, index) => {
        const idSuffix = `${name}:${id}:${index.toString()}`;
        const propsToPass = {
          idSuffix,
          blockId,
        };
        const ChildBlock = presentational ? (
          <PresentationalArgumentSlot {...propsToPass} key={index} />
        ) : (
          <ArgumentSlot {...propsToPass} key={index} />
        );
        return index === args.length - 1 ? (
          <Stack direction={"row"} alignItems={"flex-end"} key={index}>
            {ChildBlock}{" "}
            <Box
              marginLeft={"0.25em"}
              {...(blockId && blocks.has(blockId)
                ? { marginBottom: "1em" }
                : null)}
            >
              )
            </Box>
          </Stack>
        ) : (
          ChildBlock
        );
      })}
    </Stack>
  );
}
