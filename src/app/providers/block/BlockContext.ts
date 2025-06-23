import { createContext, useContext } from "react";
import { Map } from "immutable";

interface ArgumentOptions {
  minAmount: number;
  expandable?: boolean;
}

export const RootParents = {
  SolutionBox: "SolutionBox",
  BlockLibrary: "BlockLibrary",
};

export interface BlockData {
  name: string;
  argumentOptions?: ArgumentOptions;
  childBlocks?: string[];
  parentId: string;
}

type BlockContextType = Map<string, BlockData>;

export const BlockContext = createContext<BlockContextType | null>(null);

export function useBlockContext() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useBlockContext must be used within a BlockContext");
  }
  return context;
}
