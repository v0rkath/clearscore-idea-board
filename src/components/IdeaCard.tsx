import { toast } from "sonner";
import { useState } from "react";

import { Idea } from "../App";

type Props = {
  card: Idea;
  deleteCard: (id: string) => void;
  updateCard: (updatedIdea: Idea) => void;
};

export default function IdeaCard({ card, deleteCard, updateCard }: Props) {
  const [title, setTitle] = useState(card.title);
  const [desc, setDesc] = useState(card.desc);

  const count = desc.length;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { type, value } = e.target;
    if (type === "text") {
      setTitle(value);
      toast(`Updated Title: '${card.title}' Idea.`, {
        description: `'${card.title}' -> '${value}'`,
      });
      card.title = value;
    } else if (type == "textarea") {
      setDesc(value);
      card.desc = value;
      toast(`Updated Description: '${card.title}' Idea.`);
    }

    updateCard(card);
  }

  return (
    <div className="flex max-w-[380px] min-w-[380px] flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <input
          className="text-lg font-medium"
          type="text"
          value={title}
          onChange={handleChange}
          data-testid="card-input"
        />
        <p className="text-xs whitespace-nowrap text-slate-400">
          {new Date(card.updated).toDateString()}
        </p>
      </div>

      <textarea
        className="mt-2 h-24 resize-none text-sm text-slate-500"
        value={desc}
        maxLength={140}
        onChange={handleChange}
        data-testid="card-textarea"
      />
      <p className="text-right text-xs text-slate-400">
        {count > 130 ? `${count} / 140` : null}
      </p>
      <button
        className="mt-2 rounded-md bg-black px-2 py-3 text-slate-50 hover:bg-slate-900"
        onClick={() => deleteCard(card.id)}
      >
        Delete
      </button>
    </div>
  );
}
