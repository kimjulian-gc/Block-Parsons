import type { BlockData } from "../common/providers/block/block-types.ts";
import { parseTemplateSolution, turnIntoBlock } from "./gen-utils.ts";

export function generateSolutionFromScamper(src: string) {
  const { nodes: queue } = parseTemplateSolution(src);

  // console.log(queue);
  const blockMap = new Map<string, BlockData>();

  for (const node of queue) {
    turnIntoBlock(node, blockMap);
  }

  return blockMap;
}