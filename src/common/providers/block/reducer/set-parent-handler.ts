import { List, Map } from "immutable";
import type { BlockData } from "../BlockContext.ts";
import { ArgumentSlotPrefix } from "../../../../block/ArgumentSlot.tsx";
import { SectionTitles, throwNull } from "../../../utils.ts";
import type { Active, Over } from "@dnd-kit/core";
import type { BlockDispatchType } from "./block-reducer.ts";

function removeChildFromParent(
  child: BlockData,
  blocks: Map<string, BlockData>,
  id: string,
) {
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
  return { ogParentId, ogChildBlocks, ogIndex, updatedBlockMap };
}

function removeChildFromTopLevel(solutionTopLevel: List<string>, id: string) {
  const ogTopLevelIndex = solutionTopLevel.indexOf(id);
  const updatedTopLevel = solutionTopLevel.filterNot(
    (blockId) => blockId === id,
  );
  return { ogTopLevelIndex, updatedTopLevel };
}

function setTopLevelParent(
  sectionTitle: string,
  updatedBlockMap: Map<string, BlockData>,
  id: string,
  updatedTopLevel: List<string>,
  active: Active | null,
  over: Over | null,
) {
  // top-level block
  console.warn("new parent top level", sectionTitle);
  if (sectionTitle === SectionTitles.BlockLibrary) {
    return {
      blocks: updatedBlockMap.setIn(
        [id, "parentId"],
        SectionTitles.BlockLibrary,
      ),
      solutionTopLevel: updatedTopLevel,
    };
  }
  // otherwise top level solution box
  if (sectionTitle === SectionTitles.SolutionBox) {
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
    blocks: updatedBlockMap.setIn([id, "parentId"], SectionTitles.SolutionBox),
    solutionTopLevel: updatedTopLevel.splice(overSortIndex + offset, 0, id),
  };
}

export function handleSetParent(
  action: BlockDispatchType,
  blocks: Map<string, BlockData>,
  solutionTopLevel: List<string>,
) {
  if (action.type !== "SET_PARENT") {
    throw new Error("expected SET_PARENT action");
  }
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
  const { ogParentId, ogChildBlocks, ogIndex, ...removeParentRest } =
    removeChildFromParent(child, blocks, id);
  // remove child from solution top level if exists
  const { ogTopLevelIndex, ...removeTopLevelRest } = removeChildFromTopLevel(
    solutionTopLevel,
    id,
  );

  let { updatedBlockMap } = removeParentRest;
  let { updatedTopLevel } = removeTopLevelRest;

  // set new parent
  const [prefix, ...suffix] = parentId.split(":");
  if (!prefix.startsWith(ArgumentSlotPrefix)) {
    return setTopLevelParent(
      prefix,
      updatedBlockMap,
      id,
      updatedTopLevel,
      active,
      over,
    );
  }

  const [newParentId, parsedSlotIndex] = suffix;
  updatedBlockMap = updatedBlockMap.setIn([id, "parentId"], newParentId);
  const newParent = updatedBlockMap.get(newParentId);
  if (!newParent || !parsedSlotIndex) {
    throw new Error("new parent not found?");
  }
  const parentChildBlocks = [...(newParent.childBlocks ?? [])];
  // potential swap
  const slotIndex = Number(parsedSlotIndex);
  const tempId = parentChildBlocks[slotIndex];
  parentChildBlocks[slotIndex] = id;
  updatedBlockMap = updatedBlockMap.setIn(
    [newParentId, "childBlocks", slotIndex],
    id,
  );

  if (!tempId) {
    // no swap required
    return { blocks: updatedBlockMap, solutionTopLevel: updatedTopLevel };
  }
  if (tempId === ogParentId) {
    // don't allow swap with original parent
    console.warn("ignoring attempted swap with original parent");
    return { blocks, solutionTopLevel };
  }

  console.log("swapping", ogIndex);
  if (ogParentId === SectionTitles.SolutionBox) {
    // top level swap
    console.warn("top level swap");
    // add temp to top level
    updatedTopLevel = updatedTopLevel.splice(ogTopLevelIndex, 0, tempId);
  } else if (ogChildBlocks && ogIndex !== null && ogIndex > -1) {
    // update ogChildBlocks
    console.warn("updating original child blocks");
    updatedBlockMap = updatedBlockMap.setIn(
      [ogParentId, "childBlocks", ogIndex],
      tempId,
    );
  }
  updatedBlockMap = updatedBlockMap.setIn([tempId, "parentId"], ogParentId);

  return { blocks: updatedBlockMap, solutionTopLevel: updatedTopLevel };
}
