import React from "react";

const QuizTitleAndImage = ({ title, image }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <img className="w-[80px] h-[80px] object-contain" src={image} alt={title} />
        <p className="text-white text-md font-medium">{title}</p>
      </div>
    </div>
  );
};

export default QuizTitleAndImage;
