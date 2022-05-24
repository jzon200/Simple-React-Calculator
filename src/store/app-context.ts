import { createContext } from "react";

export interface AppContextInterface {
  total: number;
  expression: string;
  onClick: (input: string) => void;
}

const AppContext = createContext<AppContextInterface>({
  total: 0,
  expression: "",
  onClick: () => {},
});

export default AppContext;
