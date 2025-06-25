import { type PropsWithChildren, useReducer } from "react";
import { blockReducer } from "./block-reducer.ts";
import { BlockContext } from "./BlockContext.ts";
import { BlockDispatchContext } from "./BlockDispatchContext.ts";
import { initialState } from "./initial-state.ts";

export function BlockProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(blockReducer, initialState);

  // console.log(blockMap);

  return (
    <BlockContext value={state}>
      <BlockDispatchContext value={dispatch}>{children}</BlockDispatchContext>
    </BlockContext>
  );
}
