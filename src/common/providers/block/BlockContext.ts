import { createContext, useContext } from "react";
import type { BlockData } from "./block-types.ts";

export interface ArgumentOptions {
  minAmount: number;
  expandable?: boolean;
}

// export interface BlockData {
//   name: string;
//   argumentOptions?: ArgumentOptions;
//   childBlocks?: (string | null)[];
//   parentId: string;
// }

export interface BlockContextType {
  blocks: Map<string, BlockData>;
  solutionTopLevel: readonly string[];
}

export const BlockContext = createContext<BlockContextType | null>(null);

export function useBlockContext() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useBlockContext must be used within a BlockContext");
  }
  return context;
}
