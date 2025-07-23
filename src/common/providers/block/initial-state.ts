import type { BlockData } from "./block-types.ts";
import { SectionTitles } from "../../utils.ts";
import type { BlockContextType } from "./BlockContext.ts";

const plusId = "plus";
const oneId = "1";
const addExprId = "add-expr";
// const plusId2 = "plus";
const reduceId = "reduce";
const reduceExprId = "reduce-expr";
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
    reduceId,
    {
      type: "ConstantBlock",
      value: "reduce",
      parentId: reduceExprId,
    },
  ],
  // [
  //   plusId2,
  //   {
  //     type: "ConstantBlock",
  //     value: "+",
  //     parentId: addExprId,
  //   },
  // ],
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
        { id: null, locked: false },
        { id: null, locked: false },
        // { id: plusId2, locked: false, acceptsFunction: false },
      ],
      parentId: SectionTitles.SolutionBox,
    },
  ],
  [
    reduceExprId,
    {
      type: "BlockWithChildren",
      children: [
        { id: reduceId, locked: true },
        { id: null, locked: false, acceptsFunction: true },
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
