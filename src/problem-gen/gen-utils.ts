// export function generateFromScamper(src: string) {
//   const {
//     ast: { nodes: queue },
//   } = parseProgram(src);
//
//   let blockMap = new Map<string, BlockData>();
//
//   while (queue.length > 0) {
//     const node = queue.shift();
//
//     // should not be possible, but just to satisfy TypeScript
//     if (!node) continue;
//
//     console.log(node.value);
//
//     const blockId = newUUID();
//     let name = node.simplename;
//     let argumentOptions: ArgumentOptions | undefined = undefined;
//     // TODO: match statements also have children!
//     if (node.value.toLowerCase() === "s-expression") {
//       const funcNode = node.children.shift();
//       if (!funcNode) {
//         throw new Error(
//           "Scamper is broken: first node of s-expression doesn't exist?",
//         );
//       }
//
//       name = funcNode.simplename;
//       console.log(
//         "this is an s expression, function is: ",
//         funcNode.simplename,
//       );
//
//       argumentOptions = { minAmount: node.children.length };
//       for (const child of node.children) {
//         queue.push(child);
//       }
//     }
//
//     blockMap = blockMap.set(blockId, {
//       parentId: SectionTitles.BlockLibrary
//     });
//   }
//
//   for (const entry of blockMap.entries()) {
//     console.log(entry);
//   }
//
//   return blockMap;
// }
