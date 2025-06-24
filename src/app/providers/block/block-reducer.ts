import { type BlockData, RootParents } from "./BlockContext.ts";
import { Map } from "immutable";
import { ArgumentSlotPrefix } from "../../../block/ArgumentSlot.tsx";

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

export type BlockDispatchType = {
  type: "SET_PARENT";
  payload: { id: string; parentId: string };
};

export function blockReducer(
  state: typeof startingBlockMap,
  action: BlockDispatchType,
) {
  switch (action.type) {
    // TODO: add more cases, for now ignore eslint
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case "SET_PARENT": {
      const { id, parentId } = action.payload;
      console.log(id, parentId);
      const child = state.get(id);
      if (!child) {
        throw new Error(`attempted to set parent of unknown block ${id}`);
      }
      // remove child from original parent's child blocks
      const ogParentId = child.parentId;
      const ogParent = state.get(ogParentId);
      const ogChildBlocks = ogParent?.childBlocks;
      let ogIndex: number | null = null;
      if (ogChildBlocks && (ogIndex = ogChildBlocks.indexOf(id)) > -1) {
        console.log("removing from ogChildBlocks");
        // if (ogIndex === ogChildBlocks.length - 1) {
        //   ogChildBlocks.pop();
        // } else {
        ogChildBlocks[ogIndex] = null;
        // }
        ogParent.childBlocks = ogChildBlocks;
      }

      // set new parent
      const [prefix, newParentId, slotIndex] = parentId.split(":");
      if (!prefix.startsWith(ArgumentSlotPrefix)) {
        // top-level block
        console.warn("new parent top level", prefix);
        child.parentId = RootParents.SolutionBox;
        return state.set(id, child);
      }
      // set new parent
      child.parentId = newParentId;
      const updatedChildState = state.set(id, child);
      const newParent = state.get(newParentId);
      if (!newParent || !slotIndex) {
        throw new Error("new parent not found?");
      }
      const parentChildBlocks = newParent.childBlocks ?? [];
      // potential swap
      const tempId = parentChildBlocks[Number(slotIndex)];
      parentChildBlocks[Number(slotIndex)] = id;
      let temp: BlockData | undefined;
      let afterTempState = updatedChildState;
      if (tempId && (temp = updatedChildState.get(tempId))) {
        console.log("swapping", ogIndex);
        if (ogChildBlocks && ogIndex !== null && ogIndex > -1) {
          // update ogChildBlocks
          console.warn("updating ogChildBlocks");
          ogChildBlocks[ogIndex] = tempId;
          ogParent.childBlocks = ogChildBlocks;
        }
        temp.parentId = ogParentId;
        afterTempState = afterTempState.set(tempId, temp);
      }
      newParent.childBlocks = parentChildBlocks;

      console.log(afterTempState);

      return afterTempState.set(newParentId, newParent);
    }
  }
}
