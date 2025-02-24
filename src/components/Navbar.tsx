import { useRef } from "react";
import CreateIdea from "./CreateIdea";
import { IdeaModal } from "./IdeaModal";
import { Idea, Sorting } from "../App";
import Dropdown from "./Dropdown";

interface NavbarProps {
  setIdeas: (data: Idea[]) => void;
  ideas: Idea[];
  setSort: (sortType: Sorting) => void;
}

export default function Navbar({ setIdeas, ideas, setSort }: NavbarProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    return dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div>Clearscope Idea Board</div>
          <div className="navbar-right">
            <Dropdown setSort={setSort}/>
            <button onClick={() => dialogRef.current?.showModal()}>
              Create Idea
            </button>
          </div>
        </div>
      </nav>
      <IdeaModal toggleDialog={toggleDialog} ref={dialogRef}>
        <CreateIdea setIdea={setIdeas} idea={ideas} />
      </IdeaModal>
    </>
  );
}
