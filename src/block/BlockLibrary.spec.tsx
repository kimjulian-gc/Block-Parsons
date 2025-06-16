import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
//import { Component } from "react";
import { BlockLibrary } from "./BlockLibrary.tsx";
//import { BlockLabels } from "./aria-labels.ts";

describe("Block component", () => {
  it("renders block library", () => {
    render(<BlockLibrary />);
    expect(screen.getByText(/Library Box/i)).toBeInTheDocument();
  });

  it(" renders solutionBox", () => {
    render(<BlockLibrary />);
    expect(screen.getByText(/Solution Box/i)).toBeInTheDocument();
  });
  it("renders example blocks inside the block library", () => {
    render(<BlockLibrary />);
    expect(screen.getByText(/small-circle/i)).toBeInTheDocument();
    expect(screen.getByText(/medium-rectangle/i)).toBeInTheDocument();
  });
  it("renders correct number of example blocks inside the block library", () => {
    render(<BlockLibrary />);
    const blocks = screen.getAllByTestId("Block");
    expect(blocks.length).toBe(5);
  });
});
