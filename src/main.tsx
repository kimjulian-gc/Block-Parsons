import { createRoot } from "react-dom/client";
import { Block } from "./block/Block.tsx";

function throwNull(message: string): never {
  throw new Error(message);
}

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

const blocks = [
  { name: "child1", argumentOptions: { minAmount: 1 } },
  { name: "child2", argumentOptions: { minAmount: 2 } },
  { name: "child3", argumentOptions: { minAmount: 3 } },
];

createRoot(root).render(
  <Block
    name={"test"}
    argumentOptions={{ minAmount: 3 }}
    childBlocks={blocks}
  />,
);
