import { type ActionDispatch, createContext, useContext } from "react";
import type { BlockDispatchType } from "./reducer/block-reducer.ts";

type BlockDispatchContextType = ActionDispatch<[action: BlockDispatchType]>;

export const BlockDispatchContext =
  createContext<BlockDispatchContextType | null>(null);

export function useBlockDispatchContext() {
  const context = useContext(BlockDispatchContext);
  if (!context) {
    throw new Error(
      "useBlockDispatchContext must be used within an BlockDispatchContext",
    );
  }
  return context;
}
