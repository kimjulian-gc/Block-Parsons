import { createContext, useContext } from "react";
import type { Block } from "../block/Block.tsx";

interface ArgumentOptions {
  minAmount: number;
  expandable?: boolean;
}

export interface Block {
  name: string;
  argumentOptions?: ArgumentOptions;
  childBlocks?: string[];
}

interface BlockContextType {
  blocks: Block[];
}

export const BlockContext = createContext<BlockContextType | null>(null);

export function useBlockContext() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext");
  }
  return context;
}
