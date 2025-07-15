import type { BlockData } from "./block-types.ts";
import { SectionTitles } from "../../utils.ts";
import type { BlockContextType } from "./BlockContext.ts";

const plusId = "plus";
const oneId = "1";
const addExprId = "add-expr";

const blocks = new Map<string, BlockData>([
  [
    plusId,
    {
      type: "ConstantBlock",
      value: "+",
      parentId: addExprId,
    },
  ],
  [
    oneId,
    {
      type: "ConstantBlock",
      value: "1",
      parentId: addExprId,
    },
  ],
  [
    addExprId,
    {
      type: "BlockWithChildren",
      children: [
        { id: plusId, locked: true },
        { id: oneId, locked: false },
        { id: null, locked: false },
      ],
      parentId: SectionTitles.SolutionBox,
    },
  ],
]);

const solutionTopLevel = [...blocks.keys()].filter(
  (key) => blocks.get(key)?.parentId === SectionTitles.SolutionBox,
);

export const initialState: BlockContextType = {
  blocks,
  solutionTopLevel,
};

// export const initialState = {
//   blocks: generateFromScamper("(+ 1 (+ 2 3))(- 1 2)"),
//   solutionTopLevel: List<string>(),
// };
