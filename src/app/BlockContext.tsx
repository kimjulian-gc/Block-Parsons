import { createContext, useContext } from "react";
import { newUUID } from "../common/utils.ts";

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

const defineId = newUUID();
const smallGreyId = newUUID();
const solidCircleId = newUUID();
const twentyId = newUUID();
const redId = newUUID();
export const startingBlockMap = new Map<string, BlockData>([
  [
    defineId,
    {
      name: "define",
      argumentOptions: { minAmount: 2 },
      childBlocks: [smallGreyId, solidCircleId],
      parentId: null,
    },
  ],
  [smallGreyId, { name: "small-grey", parentId: defineId }],
  [
    solidCircleId,
    {
      name: "solid-circle",
      argumentOptions: { minAmount: 2 },
      childBlocks: [twentyId, redId],
      parentId: defineId,
    },
  ],
  [twentyId, { name: "20", parentId: solidCircleId }],
  [redId, { name: '"red"', parentId: solidCircleId }],
]);
