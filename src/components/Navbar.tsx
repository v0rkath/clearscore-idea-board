import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sorting } from "../App";

interface Props {
  setSort: (sortType: Sorting) => void;
}

export default function Navbar({ setSort }: Props) {
  return (
    <>
      <nav className="bg-slate-100 p-4 border-b border-slate-300 shadow-sm">
        <div className="flex justify-between content-center max-w-[1280px] mx-auto items-center">
          <div className="font-semibold">Clearscore Idea Board</div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-slate-950 hover:bg-slate-800 text-slate-50 p-2 px-3 rounded-md">
                Sort Ideas
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSort("alpha-asc")}>
                  Alphabetical Asc.
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("alpha-desc")}>
                  Alphabetical Dsc.
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("time-asc")}>
                  Date Asc.
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("time-desc")}>
                  Date Dsc.
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
