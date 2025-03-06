import { describe, expect, it } from "vitest";

import { sortCards } from ".";
import { Idea } from "@/App";

const ideas: Idea[] = [
  {
    id: "1",
    title: "Card title 1",
    desc: "Card description 1",
    updated: new Date("2025-01-01T10:00:00.000Z"),
  },
  {
    id: "2",
    title: "Card title 2",
    desc: "Card description 2",
    updated: new Date("2025-01-01T11:00:00.000Z"),
  },
  {
    id: "3",
    title: "Card title 3",
    desc: "Card description 3",
    updated: new Date("2025-01-01T12:00:00.000Z"),
  },
];

describe("sortCards", () => {
  it("should sort ideas alphabetically in descending order", () => {
    const sortedIdeas = sortCards("alpha-desc", ideas);
    expect(sortedIdeas[0].title).toBe("Card title 3");
    expect(sortedIdeas[1].title).toBe("Card title 2");
    expect(sortedIdeas[2].title).toBe("Card title 1");
  });

  it("should sort ideas alphabetically in ascending order", () => {
    const sortedIdeas = sortCards("alpha-asc", ideas);
    expect(sortedIdeas[0].title).toBe("Card title 1");
    expect(sortedIdeas[1].title).toBe("Card title 2");
    expect(sortedIdeas[2].title).toBe("Card title 3");
  });

  it("should sort ideas by date in descending order", () => {
    const sortedIdeas = sortCards("alpha-desc", ideas);
    expect(sortedIdeas[0].updated.toISOString()).toBe(
      "2025-01-01T12:00:00.000Z",
    );
    expect(sortedIdeas[1].updated.toISOString()).toBe(
      "2025-01-01T11:00:00.000Z",
    );
    expect(sortedIdeas[2].updated.toISOString()).toBe(
      "2025-01-01T10:00:00.000Z",
    );
  });

  it("should sort ideas by date in ascending order", () => {
    const sortedIdeas = sortCards("alpha-asc", ideas);
    expect(sortedIdeas[0].updated.toISOString()).toBe(
      "2025-01-01T10:00:00.000Z",
    );
    expect(sortedIdeas[1].updated.toISOString()).toBe(
      "2025-01-01T11:00:00.000Z",
    );
    expect(sortedIdeas[2].updated.toISOString()).toBe(
      "2025-01-01T12:00:00.000Z",
    );
  });
});
