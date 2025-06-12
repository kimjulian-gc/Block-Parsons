import type { BlockProps } from "../block/Block.tsx";

export function throwNull(message: string): never {
  throw new Error(message);
}

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
): BlockProps[] {
  const copy = structuredClone(topLevelBlocks);
  let removed = false;
  if (copy.find((block) => block.id === child.id)) {
    console.log("found top level, removed");
    const indexToRemove = copy.findIndex((block) => block.id === newParentId);
    copy.splice(indexToRemove, 1);
    removed = true;
  }
  const stack: StackNode[] = [];
  copy.forEach((block) => {
    stack.push({
      block,
      visited: false,
    });
  });

  let parent: BlockProps | undefined;
  // remove child and find parent
  for (
    let poppedNode = stack.pop();
    poppedNode && !removed;
    poppedNode = stack.pop()
  ) {
    if (poppedNode.visited) {
      continue;
    }

    poppedNode.visited = true;
    const block = poppedNode.block;
    console.log(block.name, newParentId);

    if (block.id === newParentId) {
      parent = block;
    }
    if (!block.childBlocks) {
      continue;
    }
    for (let i = 0; i < block.childBlocks.length; i++) {
      const childBlock = block.childBlocks[i];
      if (!childBlock) {
        continue;
      }
      if (childBlock.id === child.id) {
        // remove from original parent
        block.childBlocks[i] = undefined;
        removed = true;
        continue;
      }
      stack.push({
        block: childBlock,
        visited: false,
      });
    }
  }

  if (!newParentId) {
    copy.push(child);
  } else if (parent) {
    console.log("found a parent");
    if (!parent.childBlocks) {
      parent.childBlocks = [];
    }
    parent.childBlocks.push(child);
  }

  console.log(copy);

  return copy;
}
