import {
  Dispatch,
  FunctionComponent, PropsWithChildren, SetStateAction, createContext, useState,
} from "react";

export type TSessionState = {
  login: boolean;
};

const defaultValue: TSessionState = { login: false };

export type TSessionContext = [TSessionState, Dispatch<SetStateAction<TSessionState>>];

export const SessionContext = createContext<TSessionContext>([defaultValue, () => {}]);

export const SessionProvider : FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const session = useState<TSessionState>(defaultValue);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
