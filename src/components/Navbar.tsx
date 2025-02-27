import { SortMethods } from "../App";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  setSort: (sortType: SortMethods) => void;
};

export default function Navbar({ setSort }: Props) {
  return (
    <>
      <nav className="border-b border-slate-300 bg-slate-100 p-4 shadow-sm">
        <div className="mx-auto flex max-w-[1280px] content-center items-center justify-between">
          <div className="font-semibold">Clearscore Idea Board</div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md bg-slate-950 p-2 px-3 text-slate-50 hover:bg-slate-800">
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
