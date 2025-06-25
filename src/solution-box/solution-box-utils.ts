import { type CollisionDetection, pointerWithin } from "@dnd-kit/core";
import type { CollisionDescriptor } from "@dnd-kit/core/dist/utilities/algorithms/types";
import { SectionTitles } from "../common/utils.ts";

// collision
export const collisionDetection: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
  active,
  ...rest
}) => {
  const uiSections = pointerWithin({
    collisionRect,
    droppableRects,
    droppableContainers,
    active,
    ...rest,
  }).filter((collision) =>
    Object.values(SectionTitles).includes(collision.id.toString()),
  );
  // console.log(uiSections);
  if (uiSections.length === 0) return [];
  if (uiSections[0].id === SectionTitles.BlockLibrary) {
    return [uiSections[0]];
  }

  const collisions: CollisionDescriptor[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (!rect) continue;

    const activeTop = collisionRect.top;
    const dropTop = rect.top;
    const dropBottom = rect.bottom;
    const dist = Math.min(
      Math.abs(activeTop - dropTop),
      Math.abs(activeTop - dropBottom),
    );
    collisions.push({ id, data: { droppableContainer, value: dist } });
  }

  // notice that since the initial BlockLibrary guard
  // did not early return, we are probably dropping in solution box.
  // console.warn(noBlockLibrary);
  return collisions
    .sort((a, b) => a.data.value - b.data.value)
    .filter(
      (collision) => collision.id.toString() !== SectionTitles.BlockLibrary,
    );
};
