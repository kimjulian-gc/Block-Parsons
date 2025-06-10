import { createRoot } from "react-dom/client";
import { Block } from "./block/Block.tsx";

function throwNull(message: string): never {
  throw new Error(message);
}

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<Block name={"Test"} />);
