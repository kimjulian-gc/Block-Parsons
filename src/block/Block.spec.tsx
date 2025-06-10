import { beforeEach, expect, it } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { Block } from "./Block.tsx";

describe("Block component", () => {
  const testName = "Block component renders passed name prop";
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Block name={testName} />);
  });

  it.concurrent("renders passed name prop", () => {
    expect(renderResult.getByText(new RegExp(testName))).toBeInTheDocument();
  });
  it.concurrent("renders the correct amount of arguments", () => {});
});
