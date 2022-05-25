import { useContext } from "react";
import { regexOperations } from "../constants";
import AppContext from "../store/app-context";

const MainConsole = () => {
  const { total, expression } = useContext(AppContext);

  return (
    <div className="relative p-4 pb-2 bg-zinc-300 text-5xl text-right font-medium mb-4">
      <div className="absolute top-0 right-5 text-base text-[gray] max-w-[90%] text-ellipsis whitespace-nowrap overflow-hidden">
        {/* This replace the operations displayed in UI */}
        {regexOperations.test(expression)
          ? expression
              .replaceAll("-", "−")
              .replaceAll("*", "×")
              .replaceAll("/", "÷")
          : expression}
      </div>
      <span className="inline-block max-w-full text-ellipsis whitespace-nowrap overflow-hidden">
        {total !== 0 && "="}
        {total.toLocaleString("en-US", {
          maximumFractionDigits: 7,
        })}
      </span>
    </div>
  );
};

export default MainConsole;
