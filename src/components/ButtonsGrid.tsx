import { useContext } from "react";
import BUTTONS_INFO from "../constants";
import AppContext from "../store/app-context";
import Button from "./Button";

const ButtonsGrid = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="grid grid-cols-4 gap-2 text-xl">
      {BUTTONS_INFO.map((button, index) => (
        <Button
          key={index}
          onClick={() => {
            appContext.onClick(button.label);
          }}
          label={button.label}
        />
      ))}
    </div>
  );
};

export default ButtonsGrid;
