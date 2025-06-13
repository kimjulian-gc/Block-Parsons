import { v4 } from "uuid";

export function throwNull(message: string): never {
  throw new Error(message);
}

export const newUUID = v4;
