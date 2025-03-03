import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import CreateIdea from "./CreateIdea";
import { userEvent } from "@testing-library/user-event";

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

export const testString = `Lorem ipsum dolor sit amet, 
consectetuer adipiscing elit. Aenean commodo ligula 
eget dolor. Aenean massa. Cum sociis natoque penatibus 
et ma`;

afterEach(() => {
  cleanup();
});

describe("Card Tests", () => {
  it("should have 'Create idea' as the form heading", () => {
    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);
    const heading = screen.getByRole("heading", { name: /Create idea/i });

    expect(heading).toBeInTheDocument();
  });
});

describe("Form Tests", () => {
  it("should have input, textarea fields and a button", () => {
    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);
    const input = screen.getByTestId("title-input");
    const textarea = screen.getByTestId("description-input");
    const button = screen.getByTestId("submit-button");

    expect(input).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should focus the input element on load", () => {
    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);
    const input = screen.getByTestId("title-input");
    expect(input).toHaveFocus();
  });

  it("should make sure the input is seen as invalid when submitted without content", async () => {
    const user = userEvent.setup();

    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);
    const button = screen.getByTestId("submit-button");

    await user.click(button);
    await waitFor(() => {
      const input = screen.getByTestId("title-input");
      expect(input).toBeInvalid();
    });
  });

  it("should make sure the textarea is seen as invalid when submitted without content", async () => {
    const user = userEvent.setup();

    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);

    const button = screen.getByTestId("submit-button");
    const input = screen.getByTestId("title-input");
    const textarea = screen.getByTestId("description-input");

    await user.type(input, "Test string");
    await user.click(button);
    await waitFor(() => {
      expect(textarea).toBeInvalid();
    });
  });

  it("should show the character count when over 130 characters", async () => {
    const user = userEvent.setup();

    render(<CreateIdea setIdea={vi.fn()} ideas={cardData} />);

    const textarea = screen.getByTestId("description-input");
    await user.type(textarea, testString);
    const count = screen.getByRole("paragraph");

    await waitFor(() => {
      expect(count).toBeInTheDocument();
    });
  });
});
