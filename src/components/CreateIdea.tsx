import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

import { Idea } from "../App";

type Props = {
  setIdea: (data: Idea[]) => void;
  idea: Idea[];
}

export default function CreateIdea({ setIdea, idea }: Props) {
  const inputEl = useRef<HTMLInputElement>(null);

  function addIdea(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const ideaData: Idea = {
      id: uuidv4(),
      title: String(formData.get("idea")),
      desc: String(formData.get("description")),
      updated: new Date(),
    };

    event.currentTarget.reset();
    inputEl.current?.focus();

    setIdea([...idea, ideaData]);
  }

  return (
    <div className="flex min-w-[380px] flex-col rounded-lg bg-black p-4 text-left text-slate-200">
      <h1 className="border-b border-slate-800 text-lg font-medium">
        Create idea
      </h1>
      <form className="mt-2 flex flex-col" onSubmit={addIdea}>
        <label className="mb-1 text-sm" htmlFor="idea">
          Idea:
        </label>
        <input
          autoFocus
          className="mb-2 rounded-sm border border-slate-400 bg-slate-50 p-2 text-sm text-slate-900"
          type="text"
          id="idea"
          name="idea"
          ref={inputEl}
        />
        <label className="mb-1 text-sm" htmlFor="description">
          Description:
        </label>
        <textarea
          className="resize-none rounded-sm border border-slate-400 bg-slate-50 p-2 text-sm text-slate-900"
          id="description"
          name="description"
          maxLength={140}
        />
        <button className="mt-4 rounded-sm bg-white p-1.5 font-medium text-slate-900 hover:bg-slate-200">
          Create
        </button>
      </form>
    </div>
  );
}
