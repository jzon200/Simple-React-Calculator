const ButtonsObj = {
  clear: "C",
  backspace: "⌫",
  percentage: "%",
  divide: "÷",
  seven: "7",
  eight: "8",
  nine: "9",
  multiply: "×",
  four: "4",
  five: "5",
  six: "6",
  minus: "−",
  one: "1",
  two: "2",
  three: "3",
  plus: "+",
  negate: "±",
  zero: "0",
  point: ".",
  equals: "=",
};

const regexOperations = /[+*/-]/;
const lastCharOperation = /[+*/-]$/;

export { regexOperations, lastCharOperation };

export default ButtonsObj;
