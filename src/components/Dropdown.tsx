import { useState } from "react";
import { Sorting } from "../App";

interface DropdownProps {
  setSort: (sortType: Sorting) => void;
}

export default function Dropdown({ setSort }: DropdownProps) {
  const [isShown, setIsShown] = useState(false);

  function clicked() {
    setIsShown(!isShown);
  }

  return (
    <>
      <button onClick={clicked} className="dropdown-button">
        Sort
      </button>
      {isShown && (
        <div className="dropdown-content">
          <div
            onClick={() => {
              setSort("alpha-asc");
              setIsShown(!isShown);
            }}
          >
            Alpha Asc
          </div>
          <div
            onClick={() => {
              setSort("alpha-desc");
              setIsShown(!isShown);
            }}
          >
            Alpha Desc
          </div>
          <div
            onClick={() => {
              setSort("time-asc");
              setIsShown(!isShown);
            }}
          >
            Time Asc
          </div>
          <div
            onClick={() => {
              setSort("time-desc");
              setIsShown(!isShown);
            }}
          >
            Time Desc
          </div>
        </div>
      )}
    </>
  );
}
