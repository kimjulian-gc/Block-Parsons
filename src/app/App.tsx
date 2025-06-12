import { DndContext, pointerWithin, rectIntersection } from "@dnd-kit/core";
import { Block } from "../block/Block.tsx";

export function App() {
  const blocks = [
    { name: "small-grey" },
    {
      name: "solid-circle",
      argumentOptions: { minAmount: 2 },
      childBlocks: [{ name: "20" }, { name: '"red"' }],
    },
  ];

  return (
    <DndContext
      collisionDetection={(args) => {
        const pointerCollisions = pointerWithin(args);

        if (pointerCollisions.length > 0) {
          return pointerCollisions;
        }
        return rectIntersection(args);
      }}
    >
      <Block
        name={"define"}
        argumentOptions={{ minAmount: 2 }}
        childBlocks={blocks}
      />
    </DndContext>
  );
}
