import { toast } from "sonner";
import { useEffect, useState } from "react";

import CreateIdea from "./components/CreateIdea";
import IdeaCard from "./components/IdeaCard";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";

export type Idea = {
  id: string;
  title: string;
  desc: string;
  updated: Date;
};

export type SortMethods = "alpha-desc" | "alpha-asc" | "time-desc" | "time-asc";

function App() {
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const storedIdeas = localStorage.getItem("ideas");
    return storedIdeas ? JSON.parse(storedIdeas) : [];
  });
  const [selectedSort, setSelectedSort] = useState<SortMethods>("time-desc");

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  function updateCard(updatedIdea: Idea) {
    const cards = ideas.map((idea) =>
      idea.id === updatedIdea.id
        ? {
            ...idea,
            title: updatedIdea.title,
            desc: updatedIdea.desc,
            update: new Date(),
          }
        : idea,
    );
    setIdeas(cards);
  }

  function deleteCard(id: string) {
    const cards = [...ideas];
    const index = cards.findIndex((card) => card.id === id);
    cards.splice(index, 1);
    // .filter() not used in order to have access to the card title for the toast
    setIdeas(cards);

    toast(`Deleted: ${ideas[index].title} Idea`);
  }

  function sortCards(sortType: SortMethods) {
    switch (sortType) {
      case "alpha-desc":
        return ideas.toSorted((a, b) => b.title.localeCompare(a.title));
      case "alpha-asc":
        return ideas.toSorted((a, b) => a.title.localeCompare(b.title));
      case "time-desc":
        return ideas.toSorted(
          (a, b) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime(),
        );
      case "time-asc":
        return ideas.toSorted(
          (a, b) =>
            new Date(a.updated).getTime() - new Date(b.updated).getTime(),
        );
      default:
        return ideas;
    }
  }

  const sortedCards = sortCards(selectedSort);

  return (
    <div className="h-svh">
      <Navbar setSort={setSelectedSort} />
      <main className="relative mx-auto flex max-w-[1280px] flex-col self-center p-4">
        <div className="mx-auto my-12 flex flex-wrap justify-center gap-4">
          <CreateIdea setIdea={setIdeas} ideas={ideas} />
          {sortedCards.map((card) => (
            <IdeaCard
              key={card.id}
              card={card}
              deleteCard={deleteCard}
              updateCard={updateCard}
            />
          ))}
        </div>
      </main>
      <Toaster visibleToasts={1} />
    </div>
  );
}

export default App;
