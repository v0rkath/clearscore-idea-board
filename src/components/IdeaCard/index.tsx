// import { toast } from "sonner";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Idea } from "../../App";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().max(32).min(1).nonempty({ message: "Title is required" }),
  description: z.string().max(140),
});

type Props = {
  card: Idea;
  deleteCard: (id: string, title: string) => void;
  updateCard: (updatedIdea: Idea) => void;
};

type FormFields = z.infer<typeof schema>;

export function IdeaCard({ card, deleteCard, updateCard }: Props) {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: card.title,
      description: card.desc,
    },
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const title = watch("title", card.title);
  const description = watch("description", card.desc);

  return (
    <div className="max-w-[380px] min-w-[380px] self-center rounded-lg border border-slate-200 bg-white p-4">
      <form className="flex w-full flex-col">
        <input
          type="text"
          className="text-lg font-medium"
          {...register("title", {
            onBlur: (e) => {
              updateCard({ ...card, title: e.target.value });
              toast(`Updated Title: ${card.title}`);
            },
            onChange: () => {
              trigger("title");
            },
          })}
          value={title}
          maxLength={32}
          data-testid="card-input"
        />
        {errors.title && (
          <div className="pb-1 text-xs text-red-500">
            {errors.title.message}
          </div>
        )}
        <p className="border-b border-b-slate-200 pb-2 text-xs whitespace-nowrap text-slate-400">
          {new Date(card.updated).toDateString()}
        </p>
        <div className="flex flex-col">
          <textarea
            className="mt-2 h-24 resize-none text-sm text-slate-500"
            {...register("description", {
              required: true,
              onBlur: (e) => {
                updateCard({ ...card, desc: e.target.value });
                toast(`Updated Description: ${card.title}`);
              },
            })}
            maxLength={140}
            data-testid="card-textarea"
          />
          {errors.description && (
            <div className="pb-1 text-xs text-red-500">
              {errors.description.message}
            </div>
          )}
          {description.length > 130 ? (
            <p
              className="text-right text-xs text-slate-400"
              data-testid="char-count"
            >
              {description.length} / 140
            </p>
          ) : null}
          <button
            className="mt-2 rounded-md bg-black p-2 text-slate-50 hover:bg-slate-900"
            onClick={() => deleteCard(card.id, card.title)}
            data-testid="delete-button"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
