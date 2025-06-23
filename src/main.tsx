import { createRoot } from "react-dom/client";
import { throwNull } from "./common/utils.ts";
import { App } from "./app/App.tsx";

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<App />);
