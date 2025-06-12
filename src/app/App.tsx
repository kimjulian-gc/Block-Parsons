import {
  type CollisionDetection,
  DndContext,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { Block, type BlockProps } from "../block/Block.tsx";
import { useState } from "react";
import { randomUUID } from "node:crypto";

const startingBlocks: BlockProps[] = [
  {
    id: randomUUID(),
    name: "define",
    argumentOptions: { minAmount: 2 },
    childBlocks: [
      { id: randomUUID(), name: "small-grey" },
      {
        id: randomUUID(),
        name: "solid-circle",
        argumentOptions: { minAmount: 2 },
        childBlocks: [
          { id: randomUUID(), name: "20" },
          { id: randomUUID(), name: '"red"' },
        ],
      },
    ],
  },
];

export function App() {
  const [topLevelBlocks] = useState<BlockProps[]>(startingBlocks);

  const collisionDetection: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    return rectIntersection(args);
  };

  return (
    <DndContext collisionDetection={collisionDetection}>
      {topLevelBlocks.map((blockProps, index) => (
        <Block {...blockProps} key={index} />
      ))}
    </DndContext>
  );
}
