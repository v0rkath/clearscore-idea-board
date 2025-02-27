import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

import CreateIdea from "../../src/components/CreateIdea";

const cardData = [
  {
    id: "1",
    title: "Card title 1",
    desc: "Card description 1",
    updated: new Date(),
  },
  {
    id: "2",
    title: "Card title 2",
    desc: "Card description 2",
    updated: new Date(),
  },
];

describe("group", () => {
  it("should", () => {
    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);

    const heading = screen.getByRole("heading");
    const headingText = screen.getByText("Create idea");
    expect(heading).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
  });
});
