/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { MouseEvent, FunctionComponent, useContext } from "react";
import { SessionContext } from "@shared/context/Session.context";
import axios from "axios";

interface Props {
  onToggle: () => void
}

export const SidebarComponent : FunctionComponent<Props> = ({ onToggle }) => {
  const [, setSession] = useContext(SessionContext);

  const onLogout = () => {
    axios({
      method: "DELETE",
      url: "/api/v1/auth/logout",
    });
    setSession({ login: false });
  };

  const handleParentClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle();
  };

  return (
    <div className="absolute w-full h-full bg-basic-black bg-opacity-50 z-10" onKeyDown={onToggle} onClick={handleParentClick} role="button" tabIndex={0}>
      <div
        className="bg-basic-white w-3/4 h-full flex flex-col justify-center px-8 cursor-default"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="text-2xl font-extrabold">Awards Menu</h4>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="font-bold"><button onClick={onToggle}> Home </button></li>
          <li className="text-gray-300">Cards</li>
          <li className="text-gray-300">Profile</li>
          <li className="text-gray-300">
            <button onClick={onLogout}> Logout </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
