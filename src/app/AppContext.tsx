import { createContext, useContext } from "react";
import type { BlockProps } from "../block/Block.tsx";

interface AppContextType {
  blocks: BlockProps[];
}

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext");
  }
  return context;
}
