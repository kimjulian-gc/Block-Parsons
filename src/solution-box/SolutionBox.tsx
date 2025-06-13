import {
  type CollisionDetection,
  DndContext,
  type DragEndEvent,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { Block, type BlockProps } from "../block/Block.tsx";
import { useState } from "react";
import { findChild, removedAndPushed } from "./app-utils.ts";
import { newUUID, throwNull } from "../common/utils.ts";

const startingBlocks: BlockProps[] = [
  {
    id: newUUID(),
    name: "define",
    argumentOptions: { minAmount: 2 },
    childBlocks: [
      { id: newUUID(), name: "small-grey" },
      {
        id: newUUID(),
        name: "solid-circle",
        argumentOptions: { minAmount: 2 },
        childBlocks: [
          { id: newUUID(), name: "20" },
          { id: newUUID(), name: '"red"' },
        ],
      },
    ],
  },
];

export function SolutionBox() {
  const [topLevelBlocks, setTopLevelBlocks] =
    useState<BlockProps[]>(startingBlocks);

  const collisionDetection: CollisionDetection = (args) => {
    // TODO: add drag overlay to avoid setting self as own child
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    return rectIntersection(args);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    // 1. find the original parent block,
    // 2. remove the active block from the original parent, and
    // 3. push to its new parent's child blocks
    // TODO: terrible DFS-based implementation,
    //  ideally we'd use a hash map over the uuids
    const child =
      findChild(topLevelBlocks, active.id.toString()) ??
      throwNull("child was somehow not found?");
    const parentSlotDetails = over?.id.toString().split(":") ?? null;
    const newParent = parentSlotDetails?.[1] ?? null;
    const argumentSlot = parentSlotDetails?.[2] ?? null;
    const newTopLevel = removedAndPushed(
      topLevelBlocks,
      child,
      newParent,
      Number(argumentSlot),
    );
    setTopLevelBlocks(newTopLevel);
  };

  return (
    <DndContext
      collisionDetection={collisionDetection}
      onDragEnd={handleDragEnd}
    >
      {topLevelBlocks.map((block) => (
        <Block {...block} key={block.id} />
      ))}
    </DndContext>
  );
}
