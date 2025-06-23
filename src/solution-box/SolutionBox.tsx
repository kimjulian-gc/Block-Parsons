import { Block, type BlockProps } from "../block/Block.tsx";
import { Sortable } from "../block/dnd/Sortable.tsx";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface SolutionBoxProps {
  topLevelBlocks: BlockProps[];
  activeBlockId: string | undefined;
}

export function SolutionBox({
  topLevelBlocks,
  activeBlockId,
}: SolutionBoxProps) {
  const sortedBlockIds = topLevelBlocks.map((block) => block.id);

  return (
    <SortableContext
      items={sortedBlockIds}
      strategy={verticalListSortingStrategy}
    >
      {topLevelBlocks.map((block) => (
        <Sortable id={block.id} key={block.id}>
          <Block
            {...block}
            key={block.id}
            presentational={activeBlockId === block.id}
          />
        </Sortable>
      ))}
    </SortableContext>
  );
}
