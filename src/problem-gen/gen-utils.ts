import { parseProgram } from "scamper/src/parser/parser.ts";
import { SyntaxNode } from "scamper/src/ast.ts";
import { newUUID, SectionTitles } from "../common/utils.ts";
import type { BlockData } from "../common/providers/block/block-types.ts";

function turnIntoBlock(
  node: SyntaxNode,
  blockMap: Map<string, BlockData>,
): string {
  const blockId = newUUID();
  console.log(node);
  if (node.simplename.toLowerCase() !== "s-expression") {
    blockMap.set(blockId, {
      type: "ConstantBlock",
      value: node.simplename,
      parentId: SectionTitles.BlockLibrary,
    });
    return blockId;
  }

  // otherwise it is an s-expression with optional children
  const firstNode = node.children.shift();
  if (!firstNode) {
    throw new Error(
      "Scamper is broken: first node of s-expression doesn't exist?",
    );
  }

  // function updateParentOfChild(childId: string) {
  //   const blockData =
  //     blockMap.get(childId) ?? throwNull("somehow block data doesn't exist?");
  //   blockMap.set(childId, {
  //     ...blockData,
  //     parentId: blockId,
  //   });
  // }

  turnIntoBlock(firstNode, blockMap);
  // TODO: support special syntax
  // const firstBlockId = turnIntoBlock(firstNode, blockMap);
  // updateParentOfChild(firstBlockId);

  // const blockChildren = [{ id: firstBlockId, locked: false }];
  const blockChildren = [{ id: null, locked: false }];
  for (const child of node.children) {
    turnIntoBlock(child, blockMap);
    // const childId = turnIntoBlock(child, blockMap);
    // updateParentOfChild(childId);
    // blockChildren.push({ id: childId, locked: false });
    blockChildren.push({ id: null, locked: false });
  }

  blockMap.set(blockId, {
    type: "BlockWithChildren",
    parentId: SectionTitles.BlockLibrary,
    children: blockChildren,
  });

  return blockId;
}

export function generateFromScamper(src: string) {
  const {
    ast: { nodes: queue },
  } = parseProgram(src);

  console.log(queue);
  const blockMap = new Map<string, BlockData>();

  for (const node of queue) {
    turnIntoBlock(node, blockMap);
  }

  return blockMap;
}
