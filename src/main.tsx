import { createRoot } from "react-dom/client";
import { Block } from "./block/Block.tsx";

function throwNull(message: string): never {
  throw new Error(message);
}

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

const blocks = [
  { name: "small-grey" },
  {
    name: "solid-circle",
    argumentOptions: { minAmount: 2, expandable: true },
    childBlocks: [{ name: "20" }, { name: '"red"' }],
  },
];

createRoot(root).render(
  <Block
    name={"define"}
    argumentOptions={{ minAmount: 2 }}
    childBlocks={blocks}
  />,
);
