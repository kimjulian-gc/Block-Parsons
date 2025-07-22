import { SectionTitles } from "../../utils.ts";

import { generateSolutionFromScamper } from "../../../problem-gen/state-generators.ts";

// const plusId = "plus";
// const oneId = "1";
// const addExprId = "add-expr";

// const blocks = new Map<string, BlockData>([
//   [
//     plusId,
//     {
//       type: "ConstantBlock",
//       value: "+",
//       parentId: addExprId,
//     },
//   ],
//   [
//     oneId,
//     {
//       type: "ConstantBlock",
//       value: "1",
//       parentId: addExprId,
//     },
//   ],
//   [
//     addExprId,
//     {
//       type: "BlockWithChildren",
//       children: [
//         { id: plusId, locked: false },
//         { id: oneId, locked: false },
//         { id: null, locked: false },
//       ],
//       parentId: SectionTitles.SolutionBox,
//     },
//   ],
// ]);
const blocks = generateSolutionFromScamper(
  "(`+ 1)^(`- 2 (reduce + `(list 4 5)))(list 6 7 8 9)",
);

const solutionTopLevel = [...blocks.keys()].filter(
  (key) => blocks.get(key)?.parentId === SectionTitles.SolutionBox,
);

// export const initialState: BlockContextType = {
//   blocks,
//   solutionTopLevel,
// };

export const initialState = {
  blocks,
  solutionTopLevel,
};
