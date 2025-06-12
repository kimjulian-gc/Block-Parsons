import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import { throwNull } from "./app/app-utils.ts";

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<App />);
