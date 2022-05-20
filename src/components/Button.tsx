type Props = {
  label: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="grid place-items-center w-20 h-16 bg-gray-300 text-xl font-medium 
    hover:bg-gray-400 last-of-type:bg-blue-400 last-of-type:hover:bg-blue-500"
    >
      {props.label}
    </button>
  );
};

export default Button;
