import { createRoot } from "react-dom/client";
import { SolutionBox } from "./solution-box/SolutionBox.tsx";
import { throwNull } from "./common/utils.ts";

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<SolutionBox />);
