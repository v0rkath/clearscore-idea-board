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
  const [cardTitle, setCardTitle] = useState(title);
  const [cardDesc, setCardDesc] = useState(desc);

  const count = cardDesc.length;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCardTitle(e.target.value);
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCardDesc(e.target.value);
  }

  useEffect(() => updateCard(cardTitle, cardDesc, id), [cardTitle, cardDesc]);

  return (
    <div className="flex flex-col text-left border border-slate-200 rounded-lg p-4 min-w-[380px] max-w-[380px] justify-between">
      <div className="flex border-b border-slate-200 items-center pb-2 justify-between">
        <input
          className="text-lg font-medium"
          type="text"
          value={cardTitle}
          onChange={handleInputChange}
        />
        <p className="text-xs text-slate-400">
          {new Date(date).toDateString()}
        </p>
      </div>

      <textarea
        className="text-sm text-slate-500 h-24 resize-none mt-2"
        value={cardDesc}
        maxLength={140}
        onChange={handleTextAreaChange}
      />
      <p className="text-xs text-slate-400 text-right">
        {count > 130 ? `${count} / 140` : null}
      </p>
      <button
        className="bg-slate-900 text-slate-50 px-2 py-3 rounded-md mt-2 hover:bg-slate-800"
        onClick={() => deleteCard(id)}
      >
        Delete
      </button>
    </div>
  );
}
