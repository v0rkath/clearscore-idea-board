import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { userEvent } from "@testing-library/user-event";

import React from "react";

import IdeaCard from "../../src/components/IdeaCard";
import { testString } from "./CreateIdea.test";

const cardData = {
  id: "1",
  title: "Card title",
  desc: "Card description",
  updated: new Date("2025-02-28T17:53:37.368Z"),
};

afterEach(() => {
  cleanup();
});

describe("Idea Card", () => {
  it("should render the data from cardData", () => {
    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    expect(screen.getByTestId("card-input")).toHaveValue(cardData.title);
    expect(screen.getByTestId("card-textarea")).toHaveValue(cardData.desc);
    expect(screen.getByText("Fri Feb 28 2025"));
  });

  it("should be able to edit the title", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const titleInput = screen.getByTestId("card-input");
    await user.type(titleInput, " (test)");

    await waitFor(() => {
      expect(titleInput).toHaveValue("Card title (test)");
    });
  });

  it("should be able to edit the description", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const description = screen.getByTestId("card-textarea");
    await user.type(description, " (test)");

    await waitFor(() => {
      expect(description).toHaveValue("Card description (test)");
    });
  });

  it("should show the character count when limit reached", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const description = screen.getByTestId("card-textarea");
    await user.clear(description);
    await user.type(description, testString);

    await waitFor(() => {
      expect(screen.getByTestId("char-count"));
    });
  });

  it("should only allow 28 characters in the title", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const titleInput = screen.getByTestId("card-input");
    await user.type(titleInput, testString);

    await waitFor(() => {
      expect(titleInput.getAttribute("value")?.length).toBe(28);
    });
  });

  it("should call the delete function when button is clicked", async () => {
    const user = userEvent.setup();

    const deleteFunc = vi.fn();

    render(
      <IdeaCard card={cardData} deleteCard={deleteFunc} updateCard={vi.fn()} />,
    );

    const button = screen.getByTestId("delete-button");
    await user.click(button);

    await waitFor(() => {
      expect(deleteFunc).toBeCalled();
    });
  });
});
