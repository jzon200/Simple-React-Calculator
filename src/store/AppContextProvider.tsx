import { ReactNode, useReducer } from "react";
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
  switch (action.type) {
    case "clear":
      return initialState;
    case "backspace":
      return {
        ...state,
        expression:
          state.expression.length > 1 ? state.expression.slice(0, -1) : "",
      };
    case "percentage":
      return {
        total: state.total / 100,
        expression: eval(`${state.total / 100}`),
      };
    case "negate":
      return {
        total: -Math.abs(state.total),
        expression: eval(`-Math.abs(${state.total})`),
      };
    case "input":
      // TODO: Simplify the logic and clean the code
      const lastCharacterIsOperation = /[+*\/-]/gi.test(
        state.expression.slice(-1)
      );
      const inputIsOperation = /[+*\/-]/gi.test(action.payload);
      let expression: string;
      if (state.expression.length < 1 && inputIsOperation) {
        expression = "0" + action.payload;
      } else if (lastCharacterIsOperation && inputIsOperation) {
        expression = state.expression.replace(/[+*\/-]$/, action.payload);
      } else {
        expression = state.expression + action.payload;
      }
      return {
        ...state,
        expression,
      };
    case "evaluate":
      let total: number;
      try {
        // this removes the last operation found on expression.
        const regex = /[+*\/-]$/;
        const removedOperations = state.expression.replace(regex, "");
        total = eval(removedOperations) as number;
      } catch (error) {
        if (error instanceof SyntaxError) {
          total = state.total;
          console.log(error);
        } else {
          total = NaN;
          console.log(error);
        }
      }
      return {
        ...state,
        total: state.expression.length > 0 ? total : 0,
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
