import { beforeEach, expect, it } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { Block } from "./Block.tsx";
import { BlockLabels } from "./aria-labels.ts";

describe("Block component", () => {
  const testName = "Block component test block";
  const argumentAmt = 3;
  const testBlock1 = (
    <Block name={testName} argumentOptions={{ minAmount: argumentAmt }} />
  );
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(testBlock1);
  });

  it("renders passed name prop", () => {
    expect(renderResult.getByText(new RegExp(testName))).toBeInTheDocument();
  });
  it("renders the correct amount of arguments", () => {
    expect(
      renderResult.getAllByLabelText(BlockLabels.ArgumentSlot),
    ).toHaveLength(argumentAmt);
  });
  it("renders with passed Block children", () => {
    const testName2 = "Parent block";
    const argumentAmt = 2;
    renderResult.unmount();
    renderResult = render(
      <Block
        name={testName2}
        argumentOptions={{ minAmount: argumentAmt }}
        childBlocks={[testBlock1.props]}
      />,
    );

    expect(renderResult.getByText(new RegExp(testName))).toBeInTheDocument();
  });
});
