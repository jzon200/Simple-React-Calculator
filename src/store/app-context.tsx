import { createContext, ReactNode, useState } from "react";

type ContextObj = {
  value: string;
  onClick: (input: string) => void;
};

const AppContext = createContext<ContextObj>({
  value: "0",
  onClick: () => {},
});

type Props = {
  children: ReactNode;
};

export const AppContextProvider = (props: Props) => {
  const [value, setValue] = useState<string>("0");

  const calculatorButtonHandler = (input: string) => {
    if (value === "0") {
      setValue(input);
      return;
    }
    setValue((prevState) => prevState + input);
  };

  const contextValue: ContextObj = {
    value: value,
    onClick: calculatorButtonHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
