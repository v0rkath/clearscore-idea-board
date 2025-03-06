import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Idea } from "@/App";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().max(32).nonempty(),
  description: z.string().max(140),
});

type FormFields = z.infer<typeof schema>;

type Props = {
  setIdea: (data: Idea[]) => void;
  ideas: Idea[];
};

export function CreateIdea({ setIdea, ideas }: Props) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const ideaData: Idea = {
      id: uuidv4(),
      title: data.title,
      desc: data.description,
      updated: new Date(),
    };

    setIdea([...ideas, ideaData]);
    setFocus("title");
    reset();
  };

  return (
    <div className="flex min-w-[380px] flex-col rounded-lg bg-black p-4 text-left text-slate-200">
      <h1 className="border-b border-slate-800 text-lg font-medium">
        Create idea
      </h1>
      <form className="mt-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-1 text-sm" htmlFor="title">
          Idea:
        </label>
        <input
          autoFocus
          type="text"
          id="title"
          className="mb-2 rounded-sm border border-slate-400 bg-slate-50 p-2 text-sm text-slate-900"
          placeholder="Create an idea board website"
          {...register("title", { maxLength: 32 })}
          data-testid="title-input"
        />
        {errors.title && (
          <div className="pb-1 text-xs text-red-500">
            {errors.title.message}
          </div>
        )}
        <label className="mb-1 text-sm" htmlFor="description">
          Description:
        </label>
        <textarea
          placeholder="e.g. a place to put my ideas."
          className="resize-none rounded-sm border border-slate-400 bg-slate-50 p-2 text-sm text-slate-900"
          {...register("description")}
          maxLength={140}
          data-testid="description-input"
        />
        {watch("description")?.length > 130 ? (
          <p className="mt-0.5 text-right text-xs text-slate-500">
            {watch("description")?.length} / 140
          </p>
        ) : null}
        {errors.description && (
          <div className="pb-1 text-xs text-red-500">
            {errors.description.message}
          </div>
        )}
        <button
          type="submit"
          className="mt-4 rounded-sm bg-white p-2.5 font-medium text-slate-900 hover:bg-slate-200"
          data-testid="submit-button"
        >
          Create idea
        </button>
      </form>
    </div>
  );
}
