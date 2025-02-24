import { useEffect, useState } from "react";

interface IdeaCardProps {
  title: string;
  desc: string;
  id: string;
  date: Date;
  deleteCard: (id: string) => void;
  updateCard: (title: string, desc: string, index: string) => void;
}

export default function IdeaCard({
  title,
  desc,
  id,
  date,
  deleteCard,
  updateCard,
}: IdeaCardProps) {
  const [cardTitle, setCardTitle] = useState<string>(title);
  const [cardDesc, setCardDesc] = useState<string>(desc);
  const [charCount, setCharCount] = useState<number>(desc.length);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setCardTitle(e.target.value);
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setCardDesc(e.target.value);
    setCharCount(e.target.value.length);
  }

  useEffect(() => updateCard(cardTitle, cardDesc, id), [cardTitle, cardDesc]);

  return (
    <div className="card">
      <div className="card-top">
        <input type="text" value={cardTitle} onChange={handleInputChange} />
        <p>{charCount} / 140</p>
      </div>

      <textarea
        value={cardDesc}
        maxLength={140}
        onChange={handleTextAreaChange}
      />
      <p>Last updated: {date.toString().split("T")[0]}</p>
      <button onClick={() => deleteCard(id)}>Delete</button>
    </div>
  );
}
