import { createRoot } from "react-dom/client";
import { throwNull } from "./common/utils.ts";
import { App } from "./app/App.tsx";
import { enableMapSet } from "immer";

import { generateSolutionFromScamper } from "./problem-gen/state-generators.ts";

enableMapSet();

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<App />);

console.log(generateSolutionFromScamper("(+ 1 (+ 2 3))(- 1 2)"));
