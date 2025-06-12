import { createRoot } from "react-dom/client";
import { Block } from "./block/Block.tsx";
import { DndContext, pointerWithin, rectIntersection } from "@dnd-kit/core";

function throwNull(message: string): never {
  throw new Error(message);
}

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

const blocks = [
  { name: "small-grey" },
  {
    name: "solid-circle",
    argumentOptions: { minAmount: 2 },
    childBlocks: [{ name: "20" }, { name: '"red"' }],
  },
];

createRoot(root).render(
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
  </DndContext>,
);
