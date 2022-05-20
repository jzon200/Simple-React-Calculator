import { useContext } from "react";
import AppContext from "../store/app-context";

const MainConsole = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="p-4 bg-zinc-300 text-5xl text-right font-medium mb-4">
      {appContext.value}
    </div>
  );
};

export default MainConsole;
