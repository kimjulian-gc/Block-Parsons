import { parseProgram } from "scamper/src/parser.ts";
import type {
  ArgumentOptions,
  BlockData,
} from "../common/providers/block/BlockContext.ts";
import { newUUID, SectionTitles } from "../common/utils.ts";
import { Map } from "immutable";

export function generateFromScamper(src: string) {
  const {
    ast: { nodes: queue },
  } = parseProgram(src);

  let blockMap = Map<string, BlockData>();

  while (queue.length > 0) {
    const node = queue.shift();

    // should not be possible, but just to satisfy TypeScript
    if (!node) continue;

    console.log(node.value);

    const blockId = newUUID();
    let name = node.simplename;
    let argumentOptions: ArgumentOptions | undefined = undefined;
    // TODO: match statements also have children!
    if (node.value.toLowerCase() === "s-expression") {
      const funcNode = node.children.shift();
      if (!funcNode) {
        throw new Error(
          "Scamper is broken: first node of s-expression doesn't exist?",
        );
      }

      name = funcNode.simplename;
      console.log(
        "this is an s expression, function is: ",
        funcNode.simplename,
      );

      argumentOptions = { minAmount: node.children.length };
      for (const child of node.children) {
        queue.push(child);
      }
    }

    blockMap = blockMap.set(blockId, {
      name,
      parentId: SectionTitles.BlockLibrary,
      argumentOptions,
    });
  }

  for (const entry of blockMap.entries()) {
    console.log(entry);
  }

  return blockMap;
}
