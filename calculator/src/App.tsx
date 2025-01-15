import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";


type CalculatorButton =  "0"  | "1"  | "2"  | "3"  | "4"  | "5"  | "6"  | "7"  | "8"  | "9"  | "0"  | "+"  | "-"  | "*"  | "/"  | "=" | "C";
function App() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleClick = (value: CalculatorButton) => {
    setError(false);
    if (value === "=") {
      try {
        const result = new Function('return ' + input)()
        setInput(Number(result).toString());
      } catch (error) {
        setInput("");
        setError(true);
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput(input + value);
    }
  };
  const handleDelete = () => {
    setInput(input.slice(0, -1));
    setError(false);
  };

  const buttons: CalculatorButton[][] = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", "C", "=", "+"],
  ];

  const getButtonStyle = (button: CalculatorButton) => {
    const baseStyle =
  "w-full h-14 rounded-full font-medium text-lg transition-all duration-200 active:scale-95 ";


    if (button === "C") {
      return baseStyle + "bg-red-500 hover:bg-red-600 text-white";
    }
    if (button === "=") {
      return baseStyle + "bg-green-500 hover:bg-green-600 text-white";
    }
    if (["+", "-", "*", "/"].includes(button)) {
      return baseStyle + "bg-gray-500 hover:bg-gray-600 text-white";
    }
    return baseStyle + "bg-gray-200 hover:bg-gray-300 text-gray-800";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full mx-auto max-w-md bg-white rounded-2xl shadow-xl shadow-indigo-200 p-6">
        <div className="relative p-6">
          <div
            className={`flex justify-between items-center w-full px-4 h-16 overflow-hidden rounded-xl ${
              error ? "bg-red-50" : ""
            }`}
          >
            <span
              className={`text-3xl font-medium tracking-wider ${
                error ? "text-red-500" : "text-gray-800"
              }`}
            >
              {error ? "Error" : input || "0"}
            </span>
            <button
              className="p-2 transition-colors rounded-lg hover:bg-gray-200"
              aria-label="Delete last digit"
              onClick={handleDelete}
            >
              <FaDeleteLeft className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((row) =>(
            row.map((button) => (
              <button
                key={button}
                className={getButtonStyle(button)}
                onClick={() => handleClick(button)}
              >
                {button}
              </button>
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
