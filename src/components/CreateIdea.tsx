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
      desc: String(formData.get("idea-details")),
      updated: new Date(),
    };

    setIdea([...idea, ideaData]);
    console.log(idea);
  }

  return (
    <form className="create-idea" onSubmit={addIdea}>
      <label htmlFor="idea">Idea:</label>
      <input
        required
        type="text"
        id="idea"
        name="idea"
        placeholder="Make a website"
      ></input>
      <label htmlFor="idea-details">Details:</label>
      <textarea
        required
        id="idea-details"
        name="idea-details"
        placeholder="Create a website which lets you create ideas."
      ></textarea>
      <button type="submit">Create</button>
    </form>
  );
}
