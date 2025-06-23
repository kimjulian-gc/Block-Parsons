import { createContext, useContext } from "react";
import { Map } from "immutable";

interface ArgumentOptions {
  minAmount: number;
  expandable?: boolean;
}

export interface BlockData {
  name: string;
  argumentOptions?: ArgumentOptions;
  childBlocks?: string[];
  parentId: string | null;
}

interface BlockContextType {
  blocks: Map<string, BlockData>;
}

export const BlockContext = createContext<BlockContextType | null>(null);

export function useBlockContext() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext");
  }
  return context;
}
