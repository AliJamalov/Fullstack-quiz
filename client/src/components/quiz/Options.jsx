import React from "react";

const Options = ({ options, nextQuestion }) => {
  return (
    <div className="text-white">
      {options?.map((option, index) => (
        <ul key={index} className="flex flex-col p-2 mt-4">
          <li
            onClick={() => nextQuestion(option)}
            className="bg-violet-600 px-2 py-3 rounded-md min-w-[300px] md:min-w-[400px] cursor-pointer hover:bg-violet-700"
          >
            <span className="text-yellow-400">{index + 1}.</span> {option}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Options;
