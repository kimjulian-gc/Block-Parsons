import { type PropsWithChildren, useReducer } from "react";
import { blockReducer } from "./block-reducer.ts";
import { BlockContext } from "./BlockContext.ts";
import { BlockDispatchContext } from "./BlockDispatchContext.ts";
import { startingBlockMap } from "./initial-state.ts";

export function BlockProvider({ children }: PropsWithChildren) {
  const [blocks, dispatch] = useReducer(blockReducer, startingBlockMap);

  // console.log(blocks);

  return (
    <BlockContext value={blocks}>
      <BlockDispatchContext value={dispatch}>{children}</BlockDispatchContext>
    </BlockContext>
  );
}
