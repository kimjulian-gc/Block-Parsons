import { type PropsWithChildren, useReducer } from "react";
import { blockReducer } from "./reducer/block-reducer.ts";
import { BlockContext } from "./BlockContext.ts";
import { BlockDispatchContext } from "./BlockDispatchContext.ts";
import { initialState } from "./initial-state.ts";

export function BlockProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(blockReducer, initialState);

  // console.log(blockMap);

  return (
    <BlockContext.Provider value={state}>
      <BlockDispatchContext.Provider value={dispatch}>{children}</BlockDispatchContext.Provider>
    </BlockContext.Provider>
  );
}
