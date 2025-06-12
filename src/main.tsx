import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";

function throwNull(message: string): never {
  throw new Error(message);
}

const root =
  document.getElementById("root") ?? throwNull("React root cannot be null!");

createRoot(root).render(<App />);
