import React from "react";

const Options = ({ options, nextQuestion }) => {
  const generateABCD = (index) => {
    if (index === 0) return "A)";
    if (index === 1) return "B)";
    if (index === 2) return "C)";
    if (index === 3) return "D)";
  };

  return (
    <div className="text-black">
      {options?.map((option, index) => (
        <ul key={index} className="flex flex-col p-2 mt-4">
          <li
            onClick={() => nextQuestion(option)}
            className="bg-gray-300 px-2 py-3 rounded-md min-w-[300px] md:min-w-[400px] cursor-pointer"
          >
            <span className="text-black">{generateABCD(index)} </span> {option}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Options;
