import { v4 } from "uuid";

export function throwNull(message: string): never {
  throw new Error(message);
}

export const newUUID = v4;

export const SectionTitles = {
  BlockLibrary: "Block Library",
  SolutionBox: "Solution Box",
};
