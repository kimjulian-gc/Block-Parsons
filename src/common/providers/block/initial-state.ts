import { SectionTitles } from "../../utils.ts";

import {
  generateInitialStateFromSolution,
  generateSolutionFromScamper,
} from "../../../problem-gen/state-generators.ts";

const solution = generateSolutionFromScamper("^(`- 2 (reduce + (list `4 `5)))");
const blocks = generateInitialStateFromSolution(solution);

const solutionTopLevel = [...blocks.keys()].filter(
  (key) => blocks.get(key)?.parentId === SectionTitles.SolutionBox,
);

export const initialState = {
  blocks,
  solutionTopLevel,
};
