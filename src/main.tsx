import { createRoot } from "react-dom/client";
import { throwNull } from "./common/utils.ts";
import { App } from "./app/App.tsx";
import { enableMapSet } from "immer";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
enableMapSet();

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<App />);
