import { FunctionComponent } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Props {
  onSidebarToggle: () => void
  onFilterToggle: () => void
}

export const HeaderComponent : FunctionComponent<Props> = ({ onSidebarToggle, onFilterToggle }) => (
  <div className="flex py-2">
    <div className="flex w-1/5 justify-center">
      <button onClick={onSidebarToggle}> <MenuIcon /> </button>
    </div>
    <div className="w-3/5 flex-grow">
      <h3 className="text-center text-2xl font-extrabold">Awards</h3>
    </div>
    <div className="flex w-1/5 justify-center">
      <button onClick={onFilterToggle}> <FilterListIcon /> </button>
    </div>
  </div>
);
