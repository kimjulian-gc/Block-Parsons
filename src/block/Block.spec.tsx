import { afterEach, beforeEach, expect, it } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { Block } from "./Block.tsx";
import { BlockLabels } from "./aria-labels.ts";

describe("Block component", () => {
  const testName = "Block component renders passed name prop";
  const argumentAmt = 3;
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Block name={testName} arguments={{ amount: argumentAmt }} />,
    );
  });

  it("renders passed name prop", () => {
    expect(renderResult.getByText(new RegExp(testName))).toBeInTheDocument();
  });
  it("renders the correct amount of arguments", () => {
    expect(
      renderResult.getAllByLabelText(BlockLabels.ArgumentSlot),
    ).toHaveLength(argumentAmt);
  });
});
