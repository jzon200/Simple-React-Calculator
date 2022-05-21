import { useContext } from "react";
import AppContext from "../store/app-context";

const MainConsole = () => {
  const { total, expression } = useContext(AppContext);

  return (
    <div className="relative p-4 pb-2 bg-zinc-300 text-5xl text-right font-medium mb-4">
      <div className="absolute top-0 right-5 text-sm text-[gray]">
        {/* TODO: Fixed the Error when used for negativity(±)*/}
        {/* {/[+*\/-±]/.test(expression)
          ? expression
              .replaceAll("-", "−")
              .replaceAll("*", "×")
              .replaceAll("/", "÷")
          : expression} */}
        {expression}
      </div>
      {total !== 0 && "="}
      {total.toLocaleString(undefined, {
        maximumFractionDigits: 4,
      })}
    </div>
  );
};

export default MainConsole;
