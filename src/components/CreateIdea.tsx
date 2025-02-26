import { Idea } from "../App";
import { v4 as uuidv4 } from "uuid";

interface CreateIdeaProps {
  setIdea: (data: Idea[]) => void;
  idea: Idea[];
}

export default function CreateIdea({ setIdea, idea }: CreateIdeaProps) {
  function addIdea(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const ideaData: Idea = {
      id: uuidv4(),
      title: String(formData.get("idea")),
      desc: String(formData.get("description")),
      updated: new Date(),
    };

    setIdea([...idea, ideaData]);
    console.log(idea);
  }

  return (
    <div className="flex flex-col text-left rounded-lg p-4 bg-black text-slate-200 min-w-[380px]">
      <h1 className="font-medium text-lg border-b border-slate-300">
        Create idea
      </h1>
      <form className="flex flex-col mt-2" onSubmit={addIdea}>
        <label className="text-sm" htmlFor="idea">
          Idea:
        </label>
        <input
          className="border rounded-sm border-slate-400 bg-slate-300 mb-2 text-slate-900 text-sm p-2"
          type="text"
          id="idea"
          name="idea"
        />
        <label className="text-sm" htmlFor="description">
          Description:
        </label>
        <textarea
          className="border rounded-sm border-slate-400 bg-slate-300 resize-none text-slate-900 text-sm p-2"
          id="description"
          name="description"
          maxLength={140}
        />
        <button className="bg-white mt-4 p-1.5 rounded-sm text-slate-900 font-medium hover:bg-slate-200">
          Create
        </button>
      </form>
    </div>
  );
}
