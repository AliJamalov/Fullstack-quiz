import React from "react";

const Question = ({ curQuestion, length, index }) => {
  return (
    <div>
      <p className="font-medium text-md mt-4 text-yellow-300 text-center">
        Question {index + 1} of {length}
      </p>
      <p className="text-white font-medium text-md mt-4">{curQuestion}</p>
    </div>
  );
};

export default Question;
