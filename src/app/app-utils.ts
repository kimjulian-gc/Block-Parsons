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
  argumentSlot: number,
): BlockProps[] {
  const copy = structuredClone(topLevelBlocks);
  const instantRemove = copy.find((block) => block.id === child.id);
  if (instantRemove) {
    // console.log("found top level, removed");
    const indexToRemove = copy.findIndex((block) => block.id === newParentId);
    copy.splice(indexToRemove, 1);
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
    !instantRemove && poppedNode;
    poppedNode = stack.pop()
  ) {
    if (poppedNode.visited) {
      continue;
    }

    poppedNode.visited = true;
    // console.log("visited ", poppedNode.block.name);
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

  if (!newParentId) {
    // TODO: need to be able to top level drop in place
    copy.push(child);
  } else if (parent) {
    console.log("found a parent, pushing to ", argumentSlot);
    if (!parent.childBlocks) {
      parent.childBlocks = [];
    }
    // TODO: implement swapping
    parent.childBlocks.splice(argumentSlot, 0, child);
  } else {
    throw new Error("no parent?");
  }

  console.log(copy);

  return copy;
}
