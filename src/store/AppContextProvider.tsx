import { ReactNode, useReducer } from "react";
import { lastCharOperation, regexOperations } from "../constants";
import AppContext, { AppContextInterface } from "./app-context";

const ZERO_VALUE = 0;

type AppState = {
  total: number;
  expression: string;
};

const initialState: AppState = {
  total: ZERO_VALUE,
  expression: "",
};

type ACTIONTYPE =
  | { type: "clear" }
  | { type: "backspace" }
  | { type: "percentage" }
  | { type: "negate" }
  | { type: "evaluate" }
  | { type: "input"; payload: string };

function reducer(state: AppState, action: ACTIONTYPE) {
  const currentExpression = state.expression;
  const currentTotal = state.total;

  switch (action.type) {
    case "clear":
      return initialState;
    case "backspace":
      // This will remove the last character in expression I it is still greater than 1,
      // Otherwise, the expression is set to blank to avoid errors
      return {
        ...state,
        expression:
          currentExpression.length > 1 ? currentExpression.slice(0, -1) : "",
      };
    case "percentage":
      return {
        ...state,
        total: parseFloat(currentExpression),
        expression: `${currentTotal / 100}`,
      };
    case "negate":
      return {
        ...state,
        total: -Math.abs(currentTotal),
      };
    case "input":
      const currentInput = action.payload;
      let newExpression: string;

      // This prevents multiple floating point in expression
      if (currentInput === "." && currentExpression.includes(".")) {
        return {
          ...state,
        };
      }

      // This checks if the last character is an operation e.g "+","-","×"
      const lastCharacterIsOperation = regexOperations.test(
        currentExpression.slice(-1)
      );

      // This checks if the input is an operation
      const inputIsOperation = regexOperations.test(currentInput);

      if (currentExpression.length < 1 && inputIsOperation) {
        //* This adds "0" in expression if the first input is already an operation
        newExpression = "0" + currentInput;
      } else if (lastCharacterIsOperation && inputIsOperation) {
        newExpression = currentExpression.replace(
          lastCharOperation,
          currentInput
        );
      } else {
        //* Otherwise, the current expression will concat the input naturally
        newExpression = currentExpression + currentInput;
      }

      return {
        ...state,
        expression: newExpression,
      };
    case "evaluate":
      let newTotal = currentTotal;
      try {
        //* This will remove the last operation in expression, to evaluate correctly and avoid error
        const removedOperations = currentExpression.replace(
          lastCharOperation,
          ""
        );

        //* This will only evaluate the expression, when there is an existing expression to avoid error
        if (currentExpression.length > 0) {
          //! eval function is bad, but i only used it for easy computation,
          //! since it is a simple project 🥴
          newTotal = eval(removedOperations) as number;
        } else {
          // Otherwise, it will return a zero
          newTotal = ZERO_VALUE;
        }
      } catch (error) {
        // This prevents the app from crashing, I will just log error here
        console.log(error);
      }

      return {
        ...state,
        total: newTotal,
      };
    default:
      throw new Error("Dispatch Action undefined!");
  }
}

type Props = {
  children: ReactNode;
};

const AppContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calculatorButtonHandler = (input: string) => {
    switch (input) {
      case "C":
        dispatch({ type: "clear" });
        break;
      case "⌫":
        dispatch({ type: "backspace" });
        dispatch({ type: "evaluate" });
        break;
      case "%":
        dispatch({ type: "percentage" });
        break;
      case "=":
        dispatch({ type: "evaluate" });
        break;
      case "+":
        dispatch({ type: "input", payload: "+" });
        break;
      case "−":
        dispatch({ type: "input", payload: "-" });
        break;
      case "×":
        dispatch({ type: "input", payload: "*" });
        break;
      case "÷":
        dispatch({ type: "input", payload: "/" });
        break;
      case "±":
        dispatch({ type: "negate" });
        break;
      default:
        //* This will automatically evaluate the expression for every input
        dispatch({ type: "input", payload: input });
        dispatch({ type: "evaluate" });
    }
  };

  const contextValue: AppContextInterface = {
    total: state.total,
    expression: state.expression,
    onClick: calculatorButtonHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
