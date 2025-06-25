import type { Active, Over } from "@dnd-kit/core";
import type { BlockContextType } from "../BlockContext.ts";
import { handleSetParent } from "./set-parent-handler.ts";

export type BlockDispatchType = {
  type: "SET_PARENT";
  payload: {
    id: string;
    parentId: string;
    dndInfo: { active: Active | null; over: Over | null };
  };
};

export function blockReducer(
  { blocks, solutionTopLevel }: BlockContextType,
  action: BlockDispatchType,
): BlockContextType {
  switch (action.type) {
    // TODO: add more cases, for now ignore eslint
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case "SET_PARENT": {
      return handleSetParent(action, blocks, solutionTopLevel);
    }
  }
}
