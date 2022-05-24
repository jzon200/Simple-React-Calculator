import { useContext } from "react";
import ButtonsObj from "../constants";
import AppContext from "../store/app-context";
import Button from "./Button";

const ButtonsGrid = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="grid grid-cols-4 gap-2 text-xl">
      {Object.values(ButtonsObj).map((button, index) => (
        <Button
          key={index}
          onClick={() => {
            appContext.onClick(button);
          }}
          text={button}
        />
      ))}
    </div>
  );
};

export default ButtonsGrid;
