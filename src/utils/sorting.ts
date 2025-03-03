import { Idea } from "@/App";

export type SortMethods = "alpha-desc" | "alpha-asc" | "time-desc" | "time-asc";

export function sortCards(sortType: SortMethods, ideas: Idea[]) {
  switch (sortType) {
    case "alpha-desc":
      return ideas.toSorted((a, b) => b.title.localeCompare(a.title));
    case "alpha-asc":
      return ideas.toSorted((a, b) => a.title.localeCompare(b.title));
    case "time-desc":
      return ideas.toSorted(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime(),
      );
    case "time-asc":
      return ideas.toSorted(
        (a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime(),
      );
    default:
      return ideas;
  }
}
