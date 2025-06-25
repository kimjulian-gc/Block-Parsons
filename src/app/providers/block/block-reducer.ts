import { ArgumentSlotPrefix } from "../../../block/ArgumentSlot.tsx";
import { SectionTitles, throwNull } from "../../../common/utils.ts";
import type { Active, Over } from "@dnd-kit/core";
import type { BlockContextType } from "./BlockContext.ts";

export type BlockDispatchType = {
  type: "SET_PARENT";
  payload: {
    id: string;
    parentId: string;
    dndInfo: { active: Active | null; over: Over | null };
  };
};

export function blockReducer(
  { blocks, solutionTopLevel }: BlockContextType,
  action: BlockDispatchType,
): BlockContextType {
  switch (action.type) {
    // TODO: add more cases, for now ignore eslint
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case "SET_PARENT": {
      const {
        id,
        parentId,
        dndInfo: { active, over },
      } = action.payload;
      console.log(id, parentId);
      const child = blocks.get(id);
      if (!child) {
        throw new Error(`attempted to set parent of unknown block ${id}`);
      }
      // remove child from original parent's child blocks
      const ogParentId = child.parentId;
      const ogParent = blocks.get(ogParentId);
      const ogChildBlocks = ogParent?.childBlocks;
      let ogIndex: number | null = null;
      let updatedBlockMap = blocks;
      if (ogChildBlocks && (ogIndex = ogChildBlocks.indexOf(id)) > -1) {
        console.log("removing from ogChildBlocks");
        // if (ogIndex === ogChildBlocks.length - 1) {
        //   ogChildBlocks.pop();
        // } else {
        const modifiedBlocks = [...ogChildBlocks];
        modifiedBlocks[ogIndex] = null;
        // }
        updatedBlockMap = updatedBlockMap.setIn(
          [ogParentId, "childBlocks"],
          modifiedBlocks,
        );
        // console.log(updatedState.get(ogParentId)?.childBlocks);
      }
      // remove child from solution top level if exists
      const updatedTopLevel = solutionTopLevel.filterNot(
        (blockId) => blockId === id,
      );

      // set new parent
      const [prefix, ...suffix] = parentId.split(":");
      if (!prefix.startsWith(ArgumentSlotPrefix)) {
        // top-level block
        console.warn("new parent top level", prefix);
        if (prefix === SectionTitles.BlockLibrary) {
          return {
            blocks: updatedBlockMap.setIn(
              [id, "parentId"],
              SectionTitles.BlockLibrary,
            ),
            solutionTopLevel: updatedTopLevel,
          };
        }
        // otherwise top level solution box
        if (prefix === SectionTitles.SolutionBox) {
          // push to end of solution box
          return {
            blocks: updatedBlockMap.setIn(
              [id, "parentId"],
              SectionTitles.SolutionBox,
            ),
            solutionTopLevel: updatedTopLevel.push(id),
          };
        }
        if (!active || !over) {
          throw new Error(
            "expected dnd info to be populated when dropping into solution box",
          );
        }
        const overSortIndex = updatedTopLevel.indexOf(over.id.toString());
        // determine whether to sort before or after over
        const activeTop =
          active.rect.current.translated?.top ??
          throwNull("active rect ref somehow doesn't exist?");
        const overTopDist = Math.abs(over.rect.top - activeTop);
        const overBotDist = Math.abs(over.rect.bottom - activeTop);
        const sortAfter = overBotDist < overTopDist;
        const offset = sortAfter ? 1 : 0;
        console.warn("sorting in place", overSortIndex, sortAfter);

        return {
          blocks: updatedBlockMap.setIn(
            [id, "parentId"],
            SectionTitles.SolutionBox,
          ),
          solutionTopLevel: updatedTopLevel.splice(
            overSortIndex + offset,
            0,
            id,
          ),
        };
      }
      const [newParentId, slotIndex] = suffix;
      updatedBlockMap = updatedBlockMap.setIn([id, "parentId"], newParentId);
      const newParent = updatedBlockMap.get(newParentId);
      if (!newParent || !slotIndex) {
        throw new Error("new parent not found?");
      }
      const parentChildBlocks = [...(newParent.childBlocks ?? [])];
      // potential swap
      const tempId = parentChildBlocks[Number(slotIndex)];
      parentChildBlocks[Number(slotIndex)] = id;
      updatedBlockMap = updatedBlockMap.setIn(
        [newParentId, "childBlocks", Number(slotIndex)],
        id,
      );
      if (tempId) {
        console.log("swapping", ogIndex);
        // don't allow swap with ogParentId
        if (tempId === ogParentId) {
          console.warn("ignoring attempted swap with original parent");
          return { blocks: blocks, solutionTopLevel: updatedTopLevel };
        }
        if (ogChildBlocks && ogIndex !== null && ogIndex > -1) {
          // update ogChildBlocks
          console.warn("updating ogChildBlocks");
          updatedBlockMap = updatedBlockMap.setIn(
            [ogParentId, "childBlocks", ogIndex],
            tempId,
          );
          // console.warn(updatedState.get(ogParentId)?.childBlocks);
        }
        updatedBlockMap = updatedBlockMap.setIn(
          [tempId, "parentId"],
          ogParentId,
        );
        // console.log(updatedState.get(ogParentId)?.childBlocks);
      }

      // console.log(updatedState);

      return { blocks: updatedBlockMap, solutionTopLevel: updatedTopLevel };
    }
  }
}
