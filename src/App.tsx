import { toast } from "sonner";
import { useEffect, useState } from "react";

import { CreateIdea } from "./components/CreateIdea";
import { IdeaCard } from "./components/IdeaCard";
import { Navbar } from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import { sortCards, SortMethods } from "./utils/sorting";

export type Idea = {
  id: string;
  title: string;
  desc: string;
  updated: Date;
};

function App() {
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const storedIdeas = localStorage.getItem("ideas");
    return storedIdeas ? JSON.parse(storedIdeas) : [];
  });
  const [selectedSort, setSelectedSort] = useState<SortMethods>("time-desc");

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  function updateCard({ id, title, desc }: Idea) {
    const cards = ideas.map((idea) => {
      return idea.id === id
        ? {
            ...idea,
            title: title,
            desc: desc,
            update: new Date(),
          }
        : idea;
    });
    setIdeas(cards);
  }

  function deleteCard(id: string, title: string) {
    const filteredIdeas = ideas.filter((card) => card.id !== id);

    setIdeas(filteredIdeas);

    toast(`Deleted: ${title} Idea`);
  }

  const sortedCards = sortCards(selectedSort, ideas);

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
