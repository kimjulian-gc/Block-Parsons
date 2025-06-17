import type { BlockProps } from "../block/Block.tsx";
import type { CollisionDetection } from "@dnd-kit/core";
import type { CollisionDescriptor } from "@dnd-kit/core/dist/utilities/algorithms/types";

interface StackNode {
  block: BlockProps;
  visited: boolean;
}
export function findChild(
  topLevelBlocks: BlockProps[],
  childId: string,
): BlockProps | null {
  const stack: StackNode[] = [];
  topLevelBlocks.forEach((block) => {
    stack.push({
      block,
      visited: false,
    });
  });

  for (let poppedNode = stack.pop(); poppedNode; poppedNode = stack.pop()) {
    if (poppedNode.visited) {
      continue;
    }

    poppedNode.visited = true;
    const block = poppedNode.block;
    if (block.id === childId) {
      return block;
    }

    if (!block.childBlocks) {
      continue;
    }
    for (const child of block.childBlocks) {
      if (!child) {
        continue;
      }
      if (child.id === childId) {
        return child;
      }
      stack.push({
        block: child,
        visited: false,
      });
    }
  }

  return null;
}
export function removedAndPushed(
  topLevelBlocks: BlockProps[],
  child: BlockProps,
  newParentId: string | null,
  argumentSlot: number | null,
): BlockProps[] {
  if (child.id === newParentId) {
    console.warn("trying to drop onto/into self");
    return topLevelBlocks;
  }
  // console.log("looking for", newParentId);
  const copy = structuredClone(topLevelBlocks);
  const instantRemove = copy.findIndex((block) => block.id === child.id);
  if (instantRemove > -1) {
    copy.splice(instantRemove, 1);
  }
  // console.log("copy after potential remove", structuredClone(copy));
  const stack: StackNode[] = [];
  copy.forEach((block) => {
    stack.push({
      block,
      visited: false,
    });
  });

  let parent: BlockProps | undefined;
  let oldParent: { block: BlockProps; i: number } | undefined;
  // remove child and find parent
  for (let poppedNode = stack.pop(); poppedNode; poppedNode = stack.pop()) {
    if (poppedNode.visited) {
      continue;
    }

    poppedNode.visited = true;
    // console.log("visited", poppedNode.block.name);
    const block = poppedNode.block;

    if (block.id === newParentId) {
      // console.log("dfs found parent");
      parent = block;
    }
    if (!block.childBlocks) {
      continue;
    }
    // console.log(`pushing ${block.childBlocks.length.toString()} children`);
    for (let i = 0; i < block.childBlocks.length; i++) {
      // console.log(`child ${i.toString()}`);
      const childBlock = block.childBlocks[i];
      if (!childBlock) {
        continue;
      }
      if (childBlock.id === child.id) {
        // remove from original parent
        // console.log("REMOVED!");
        oldParent = { block: block, i: i };
        block.childBlocks.splice(i, 1);
        i--;
        continue;
      }
      stack.push({
        block: childBlock,
        visited: false,
      });
    }
  }

  function pushChild() {
    if (!newParentId) {
      copy.push(child);
      return;
    }
    if (argumentSlot === null) {
      const parentIndex = copy.findIndex((block) => block.id === newParentId);
      console.warn(
        "top level swap",
        structuredClone(copy),
        parentIndex,
        instantRemove,
      );
      copy.splice(
        parentIndex +
          (instantRemove > -1 && instantRemove <= parentIndex ? 1 : 0),
        0,
        child,
      );
      return;
    }
    if (!parent) {
      throw new Error("no parent?");
    }

    if (!parent.childBlocks) {
      parent.childBlocks = [];
    }
    const temp = parent.childBlocks[argumentSlot];
    if (oldParent?.block.id === parent.id || !temp) {
      // no swap necessary since we either:
      // 1. deleted already or
      // 2. there's nothing at the destination

      // ensure that there are enough slots
      if (parent.childBlocks.length < argumentSlot) {
        parent.childBlocks.push(
          ...new Array<undefined>(argumentSlot - parent.childBlocks.length),
        );
      }
      // if nothing at destination, just add
      if (!temp) {
        parent.childBlocks[argumentSlot] = child;
        return;
      }
      // otherwise, deleted already
      parent.childBlocks.splice(argumentSlot, 0, child);
      return;
    }
    console.warn("swap necessary");
    if (oldParent && temp.id === oldParent.block.id) {
      // notice it's impossible to swap if temp is our old parent,
      // so undo the deletion and don't swap
      const { block, i } = oldParent;
      block.childBlocks?.splice(i, 0, child);
      return;
    }
    // swap the two
    parent.childBlocks[argumentSlot] = child;
    if (!oldParent || !oldParent.block.childBlocks) {
      // oldParent was top level
      copy.splice(instantRemove, 0, temp);
      return;
    }
    const { i } = oldParent;
    // remember we deleted already!
    oldParent.block.childBlocks.splice(i, 0, temp);
  }

  pushChild();

  return copy;
}

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
