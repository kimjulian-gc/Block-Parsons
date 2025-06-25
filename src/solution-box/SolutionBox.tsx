import { Block } from "../block/Block.tsx";
import { Sortable } from "../block/dnd/Sortable.tsx";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBlockContext } from "../app/providers/block/BlockContext.ts";
import { useDndContext } from "@dnd-kit/core";

export function SolutionBox() {
  const { solutionTopLevel } = useBlockContext();
  const { active } = useDndContext();
  const sortedBlockIds = [...solutionTopLevel.keys()];

  return (
    <SortableContext
      items={sortedBlockIds}
      strategy={verticalListSortingStrategy}
    >
      {solutionTopLevel.map((id) => (
        <Sortable id={id} key={id}>
          <Block id={id} presentational={active?.id === id} />
        </Sortable>
      ))}
    </SortableContext>
  );
}
