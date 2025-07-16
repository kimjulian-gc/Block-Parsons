import { Box, Stack } from "@mui/material";
import { ArgumentSlot } from "./ArgumentSlot.tsx";
import { throwNull } from "../common/utils.ts";
import { PresentationalArgumentSlot } from "./PresentationalArgumentSlot.tsx";
import { useDndContext } from "@dnd-kit/core";
import { useBlockContext } from "../common/providers/block/BlockContext.ts";
import { isConstantBlock } from "../common/providers/block/block-types.ts";

export interface BlockProps {
  id: string;
  presentational?: boolean;
}

export function Block({ id, presentational: presentationalProp }: BlockProps) {
  const { blocks } = useBlockContext();
  const block =
    blocks.get(id) ?? throwNull(`attempted to render unknown block ${id}`);

  const { active } = useDndContext();
  const presentational = presentationalProp || active?.id === id;

  if (isConstantBlock(block)) {
    return (
      <Box
        bgcolor={"lightgreen"}
        padding={"0.5em"}
        borderRadius={"0.5em"}
        fontFamily={"monospace"}
      >
        {block.value}
      </Box>
    );
  }

  const args = block.children;

  return (
    <Stack
      width={"fit-content"}
      bgcolor={"lightgray"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      fontFamily={"monospace"}
      spacing={1}
      useFlexGap
    >
      {"("}
      {args.map((slot, index) => {
        const idSuffix = `:${id}:${index.toString()}`;
        const slotId = slot.id || null;
        if (slot.locked) {
          const childBlock = slotId ? blocks.get(slotId) : null;
          const label = childBlock
            ? isConstantBlock(childBlock)
              ? childBlock.value
              : "(...)"
            : " ";
          return (
            <Box key={index} padding={"0.25em"} color={"black"}>
              {label}
            </Box>
          );
        }
        const propsToPass = {
          idSuffix,
          blockId: slot.id ?? null,
        };
        const ChildBlock = presentational ? (
          <PresentationalArgumentSlot {...propsToPass} />
        ) : (
          <ArgumentSlot {...propsToPass} />
        );
        return (
          <Stack direction={"row"} alignItems={"flex-end"} key={index}>
            {ChildBlock}
            {index === args.length - 1 && (
              <Box
                marginLeft={"0.25em"}
                {...(slot.id && blocks.has(slot.id)
                  ? { marginBottom: "1em" }
                  : {})}
              >
                {")"}
              </Box>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}
