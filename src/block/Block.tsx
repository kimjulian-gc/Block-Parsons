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
      <Stack
        direction="row"
        // if the current block has childblocks, align baseline, else align flex-start
        alignItems={
          args.some((arg) => arg.id !== null) ? "baseline" : "flex-start"
        }
        spacing={2}
      >
        <Box>(</Box>
        <Stack spacing={1}>
          {args.map((slot, index) => {
            const idSuffix = `:${id}:${index.toString()}`;
            const slotId = slot.id;
            if (slot.locked) {
              // TODO: if final slot but locked, has no closing bracket.
              if (!slotId) {
                return (
                  <Box key={index} padding={"0.25em"} color={"black"}></Box>
                );
              }

              const childBlock =
                blocks.get(slotId) ??
                throwNull(`should have found block with id ${slotId}`);
              if (isConstantBlock(childBlock)) {
                return (
                  <Box key={index} padding={"0.25em"} color={"black"}>
                    {childBlock.value}
                  </Box>
                );
              }
              return <Block key={index} id={slotId} presentational />;
            }
            const propsToPass = { idSuffix, blockId: slotId };
            const ChildBlock = presentational ? (
              <PresentationalArgumentSlot {...propsToPass} />
            ) : (
              <ArgumentSlot {...propsToPass} />
            );

            const isLast = index === args.length - 1;

            return (
              <Stack direction="row" alignItems="flex-end" key={index}>
                {ChildBlock}
                {isLast && (
                  <Box
                    marginLeft="0.25em"
                    {...(slotId && blocks.has(slotId)
                      ? { marginBottom: "1em" }
                      : {})}
                  >
                    )
                  </Box>
                )}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
