import { afterEach, describe, expect, it, test, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { userEvent } from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

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

  it("should edit the title", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const title = screen.getByTestId("card-input");
    await user.type(title, " [test]");

    waitFor(() => {
      expect(title).toHaveValue(`${cardData.title}[test]`);
    });
  });

  it("should edit the description", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const description = screen.getByTestId("card-textarea");
    await user.type(description, " [test]");

    waitFor(() => {
      expect(description).toHaveValue(`${cardData.desc}[test]`);
    });
  });

  it("should should the character account when description is full", async () => {
    const user = userEvent.setup();

    render(
      <IdeaCard card={cardData} deleteCard={vi.fn()} updateCard={vi.fn()} />,
    );

    const description = screen.getByTestId("card-textarea");
    await user.clear(description);
    await user.type(description, testString);

    waitFor(() => {
      expect(description).toHaveValue("kk");
    });
  });
});
