import type { CollisionDetection } from "@dnd-kit/core";
import type { CollisionDescriptor } from "@dnd-kit/core/dist/utilities/algorithms/types";

// collision
export const collisionDetection: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
}) => {
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

  // console.warn(sorted);
  return collisions.sort((a, b) => a.data.value - b.data.value);
};
