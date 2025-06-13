import { Box, Stack } from "@mui/material";
import { ArgumentSlot } from "./ArgumentSlot.tsx";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { newUUID } from "../common/utils.ts";

interface ArgumentOptions {
  minAmount: number;
  // TODO: implement expandable argument slots
  expandable?: boolean;
}

export interface BlockProps {
  id?: string;
  name: string;
  argumentOptions?: ArgumentOptions;
  // TODO: i don't like this implementation of child
  //  blocks, ideally i'd like child elements
  childBlocks?: (BlockProps | undefined)[];
}

export function Block({
  id = newUUID(),
  name,
  argumentOptions,
  childBlocks,
}: BlockProps) {
  // minBase is min number of arguments
  const minBase = argumentOptions?.minAmount ?? 0;
  // check if a block is expandable
  const expandable = argumentOptions?.expandable ?? false;
  // if a block is expandable, leave
  const minAmount = expandable ? minBase + 1 : minBase;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const dragTransform = CSS.Translate.toString(transform);
  const isConstant = minAmount === 0;
  const args = ((): (BlockProps | undefined)[] => {
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
      ref={setNodeRef}
      sx={{
        transform: dragTransform,
      }}
      {...listeners}
      {...attributes}
    >
      {isConstant ? null : "("}
      {name}
      {args.map((blockProps, index) => {
        const idSuffix = `${name}:${id}:${index.toString()}`;
        return index === args.length - 1 ? (
          <Stack direction={"row"} alignItems={"flex-end"} key={index}>
            <ArgumentSlot idSuffix={idSuffix} blockProps={blockProps} />{" "}
            <Box
              marginLeft={"0.25em"}
              {...(blockProps ? { marginBottom: "1em" } : null)}
            >
              )
            </Box>
          </Stack>
        ) : (
          <ArgumentSlot
            idSuffix={idSuffix}
            blockProps={blockProps}
            key={index}
          />
        );
      })}
    </Stack>
  );
}
