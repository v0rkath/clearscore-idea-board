import CreateIdea from "./components/CreateIdea";
import IdeaCard from "./components/IdeaCard";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { useEffect, useState } from "react";

export interface Idea {
  id: string;
  title: string;
  desc: string;
  updated: Date;
}

export type Sorting = "alpha-desc" | "alpha-asc" | "time-desc" | "time-asc";

function App() {
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const storedIdeas = localStorage.getItem("ideas");
    return storedIdeas ? JSON.parse(storedIdeas) : [];
  });
  const [toastAlert, setToastAlert] = useState<boolean>(false);
  const [sorted, setSorted] = useState<Sorting>("time-desc");
  const [toastContent, setToastContent] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
    async function showToast() {
      setToastAlert(true);

      setTimeout(() => {
        setToastAlert(false);
      }, 3000);
    }
    showToast();
  }, [ideas]);

  function cardUpdate(title: string, desc: string, id: string) {
    const cards = ideas.map((idea) =>
      idea.id === id
        ? { ...idea, title: title, desc: desc, update: Date() }
        : idea
    );
    console.log(cards);
    setIdeas(cards);
    localStorage.setItem("ideas", JSON.stringify(cards));
    setToastContent("Card updated");
  }

  function deleteCard(id: string) {
    const cards = [...ideas];
    const index = cards.findIndex((card) => card.id === id);

    cards.splice(index, 1);
    console.log(cards);

    setIdeas(cards);
    setToastContent("Card deleted");
  }

  function sortCards(sortType: Sorting) {
    const ideaData = [...ideas];

    switch (sortType) {
      case "alpha-desc":
        return ideaData.sort((a, b) => b.title.localeCompare(a.title));
      case "alpha-asc":
        return ideaData.sort((a, b) => a.title.localeCompare(b.title));
      case "time-desc":
        return ideaData.sort(
          (a, b) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime()
        );
      case "time-asc":
        return ideaData.sort(
          (a, b) =>
            new Date(a.updated).getTime() - new Date(b.updated).getTime()
        );
      default:
        return [...ideaData];
    }
  }

  const sortedCards = sortCards(sorted);

  return (
    <>
      <Navbar setSort={setSorted} />
      <main className="flex flex-col self-center p-4 max-w-[1280px] mx-auto relative">
        <div className="flex gap-4 flex-wrap justify-center my-12 mx-auto">
          <CreateIdea setIdea={setIdeas} idea={ideas} />
          {sortedCards.map((card) => (
            <IdeaCard
              key={card.id}
              title={card.title}
              desc={card.desc}
              id={card.id}
              date={card.updated}
              deleteCard={deleteCard}
              updateCard={cardUpdate}
            />
          ))}
        </div>
        {toastAlert && <Toast content={toastContent} />}
      </main>
    </>
  );
}

export default App;

// click button
// open modal with form
