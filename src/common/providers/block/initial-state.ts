import { List, Map } from "immutable";
import type { BlockData } from "./BlockContext.ts";
import { newUUID, SectionTitles } from "../../utils.ts";
import { generateFromScamper } from "../../../problem-gen/gen-utils.ts";

// TODO: remove this testing default state
const defineId = "define-id";
const smallGreyId = "smallgrey-id";
const solidCircleId = "solidcircle-id";
const twentyId = "twenty-id";
const redId = "red-id";
const squareId = "square-id";
const fiveId = "five-id";
export const startingBlockMap = Map<string, BlockData>([
  [
    defineId,
    {
      name: "define",
      argumentOptions: { minAmount: 2 },
      childBlocks: [smallGreyId, solidCircleId],
      parentId: SectionTitles.SolutionBox,
    },
  ],
  [
    smallGreyId,
    {
      name: "small-grey",
      parentId: defineId,
    },
  ],
  [
    solidCircleId,
    {
      name: "solid-circle",
      argumentOptions: { minAmount: 2 },
      childBlocks: [twentyId, redId],
      parentId: defineId,
    },
  ],
  [twentyId, { name: "20", parentId: solidCircleId }],
  [redId, { name: '"red"', parentId: solidCircleId }],
  [squareId, { name: "square", parentId: SectionTitles.BlockLibrary }],
  [fiveId, { name: "5", parentId: SectionTitles.BlockLibrary }],
  [
    newUUID(),
    {
      name: "+",
      parentId: SectionTitles.BlockLibrary,
      argumentOptions: { minAmount: 2 },
    },
  ],
]);
// const initialTopLevel = startingBlockMap
//   .entrySeq()
//   .filter(([, data]) => data.parentId === SectionTitles.SolutionBox)
//   .map(([id]) => id)
//   .toList();

export const initialState = {
  blocks: generateFromScamper("(+ 1 (+ 2 3))(- 1 2)"),
  solutionTopLevel: List<string>(),
};
