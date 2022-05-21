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

//! My previous approach useState only is not efficient as it seems
// type Props = {
//   children: ReactNode;
// };

// export const AppContextProvider = (props: Props) => {
//   const [value, setValue] = useState<string>(INITIAL_VALUE);
//   const [firstOperand, setFirstOperand] = useState<string | null>(null);
//   const [secondOperand, setSecondOperand] = useState<string | null>(null);
//   const [operation, setOperation] = useState<Operation | null>(null);

//   const calculatorButtonHandler = (input: string) => {
//     switch (input) {
//       case "C":
//         setFirstOperand(null);
//         setSecondOperand(null);
//         setOperation(null);
//         setValue(INITIAL_VALUE);
//         break;
//       case "⌫":
//         setValue((prevState) => {
//           if (prevState.length <= 1) return INITIAL_VALUE;
//           return prevState.slice(0, -1);
//         });
//         break;
//       case "+":
//         setValue((prevState) => {
//           setFirstOperand(prevState);
//           setOperation("+");
//           return prevState;
//         });
//         break;
//       case "=":
//         setValue((prevState) => {
//           switch (operation) {
//             case "+":
//               if (!secondOperand) {
//                 setSecondOperand(prevState);
//               }
//               if (firstOperand && secondOperand) {
//                 setFirstOperand(prevState);
//                 return `${
//                   parseFloat(firstOperand) + parseFloat(secondOperand)
//                 }`;
//               }
//               return `${parseFloat(prevState) + parseFloat(prevState)}`;
//             default:
//               return prevState;
//           }
//         });
//         break;
//       default:
//         setValue((prevState) => {
//           if (prevState === INITIAL_VALUE) return input;
//           if (firstOperand && !secondOperand) {
//             setSecondOperand(input);
//             return input;
//           }
//           if (firstOperand && secondOperand) {
//             setSecondOperand(prevState + input);
//           }
//           return prevState + input;
//         });
//     }
//   };

//   const contextValue: ContextObj = {
//     operation,
//     secondOperand,
//     firstOperand,
//     value,
//     onClick: calculatorButtonHandler,
//   };

//   return (
//     <AppContext.Provider value={contextValue}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

export default AppContext;
