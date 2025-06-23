import type { BlockData } from "./BlockContext.tsx";
import { Map } from "immutable";
import { newUUID } from "../../common/utils.ts";

const defineId = newUUID();
const smallGreyId = newUUID();
const solidCircleId = newUUID();
const twentyId = newUUID();
const redId = newUUID();
export const startingBlockMap = Map<string, BlockData>([
  [
    defineId,
    {
      name: "define",
      argumentOptions: { minAmount: 2 },
      childBlocks: [smallGreyId, solidCircleId],
      parentId: null,
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
]);

type BlockDispatchType =
  | { type: "unparent"; payload: string }
  | { type: "parent"; payload: { id: string; parentId: string } };

function blockReducer(
  state: typeof startingBlockMap,
  action: BlockDispatchType,
) {
  switch (action.type) {
    case "unparent": {
      const block = state.get(action.payload);
      if (!block) {
        return state;
      }
      block.parentId = null;
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
