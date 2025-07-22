import { createRoot } from "react-dom/client";
import { throwNull } from "./common/utils.ts";
import { App } from "./app/App.tsx";
import { enableMapSet } from "immer";
import { generateFromScamper } from "./problem-gen/gen-utils.ts";

enableMapSet();

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<App />);

console.log(generateFromScamper("(+ 1 (+ 2 3))(- 1 2)"));
