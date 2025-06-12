import {
  type CollisionDetection,
  DndContext,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { Block, type BlockProps } from "../block/Block.tsx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const startingBlocks: BlockProps[] = [
  {
    id: uuidv4(),
    name: "define",
    argumentOptions: { minAmount: 2 },
    childBlocks: [
      { id: uuidv4(), name: "small-grey" },
      {
        id: uuidv4(),
        name: "solid-circle",
        argumentOptions: { minAmount: 2 },
        childBlocks: [
          { id: uuidv4(), name: "20" },
          { id: uuidv4(), name: '"red"' },
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
