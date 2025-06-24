import { Block } from "../block/Block.tsx";
import { Sortable } from "../block/dnd/Sortable.tsx";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBlockContext } from "../app/providers/block/BlockContext.ts";
import { useDndContext } from "@dnd-kit/core";
import { SectionTitles } from "../common/utils.ts";

export function SolutionBox() {
  const blocks = useBlockContext();
  const { active } = useDndContext();
  const topLevelBlocks = blocks.filter(
    (block) => block.parentId === SectionTitles.SolutionBox,
  );
  const sortedBlockIds = [...topLevelBlocks.keys()];

  return (
    <SortableContext
      items={sortedBlockIds}
      strategy={verticalListSortingStrategy}
    >
      {topLevelBlocks.keySeq().map((id) => (
        <Sortable id={id} key={id}>
          <Block id={id} presentational={active?.id === id} />
        </Sortable>
      ))}
    </SortableContext>
  );
}
