import { type BlockData, RootParents } from "./BlockContext.ts";
import { Map } from "immutable";

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
      parentId: RootParents.SolutionBox,
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
  [squareId, { name: "square", parentId: RootParents.BlockLibrary }],
  [fiveId, { name: "5", parentId: RootParents.BlockLibrary }],
]);

export type BlockDispatchType =
  | { type: "libraryRoot"; payload: string }
  | { type: "solutionRoot"; payload: string }
  | { type: "parent"; payload: { id: string; parentId: string } };

export function blockReducer(
  state: typeof startingBlockMap,
  action: BlockDispatchType,
) {
  switch (action.type) {
    case "libraryRoot": {
      const block = state.get(action.payload);
      if (!block) {
        return state;
      }
      block.parentId = RootParents.BlockLibrary;
      return state.set(action.payload, block);
    }
    case "solutionRoot": {
      const block = state.get(action.payload);
      if (!block) {
        return state;
      }
      block.parentId = RootParents.SolutionBox;
      return state.set(action.payload, block);
    }
    case "parent": {
      const { id, parentId } = action.payload;
      const child = state.get(id);
      const parent = state.get(parentId);
      if (!child) {
        return state;
      }
      if (!parent) {
        return state;
      }
      child.parentId = parentId;
      // update parent's child blocks
      const parentChildBlocks = parent.childBlocks ?? [];
      parentChildBlocks.push(id);
      parent.childBlocks = parentChildBlocks;

      return state.set(id, child).set(parentId, parent);
    }
  }
}
