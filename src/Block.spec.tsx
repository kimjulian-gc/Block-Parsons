import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Block } from "./Block.tsx";
import { screen } from "@testing-library/react";

describe("Block component", () => {
  it.concurrent("renders passed name prop", () => {
    const testName = "Block component renders passed name prop";
    render(<Block name={testName} />);
    expect(screen.getByText(new RegExp(testName))).toBeInTheDocument();
  });
});
