import { forwardRef } from "react";

interface IdeaModalProps {
  children: React.ReactNode;
  toggleDialog: () => void;
}

export const IdeaModal = forwardRef<HTMLDialogElement, IdeaModalProps>(
  ({ children, toggleDialog }, ref) => {
    return (
      <dialog
        className="idea-modal"
        ref={ref}
        onClick={(event) => {
          event.stopPropagation();
          if (event.currentTarget === event.target) {
            toggleDialog();
          }
        }}
      >
        {children}
      </dialog>
    );
  }
);
