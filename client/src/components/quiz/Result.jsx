import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { calculateStars } from "../../utils/utils.js";

const Result = ({ correctAnswers, length, restartQuiz, isUserHasHero }) => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setStars(calculateStars(correctAnswers));
  }, [correctAnswers]);

  return (
    <div className="flex flex-col items-center py-6 px-8 rounded-2xl justify-center mt-5 bg-white shadow-lg w-full sm:w-[400px] text-center">
      <h2 className="text-2xl font-semibold text-gray-800">Quiz Completed!</h2>
      <p className="text-lg text-gray-600 mt-4">
        You answered <span className="text-green-500 font-bold">{correctAnswers}</span> out of{" "}
        <span className="text-blue-500 font-bold">{length}</span> correctly.
      </p>

      <div className="flex items-center gap-2 px-4 relative mt-[55px]">
        <GoStarFill className="absolute bottom-3 right-[70px]" size={30} color="gray" />
        <GoStarFill className="absolute bottom-3 left-[10px]" size={30} color="gray" />
        <GoStarFill className="absolute bottom-3 left-[80px]" size={30} color="gray" />
        {Array(stars)
          .fill()
          .map((_, index) => (
            <GoStarFill
              key={index}
              className={`
                ${index === 0 && "right-[70px]"} 
                ${index === 1 && "left-[10px]"} 
                ${index === 2 && "left-[80px]"}
              absolute bottom-3`}
              size={30}
              color="yellow"
            />
          ))}
      </div>

      {stars === 3 && !isUserHasHero && (
        <p className="text-gray-600 text-md font-medium">Поздравляем ты получил нового героя!</p>
      )}
      <div className="mt-2 flex flex-col gap-3 w-full">
        <button
          onClick={restartQuiz}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all cursor-pointer"
        >
          🔄 Play Again
        </button>
        <Link to="/" className="w-full">
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all cursor-pointer">
            🏠 Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
