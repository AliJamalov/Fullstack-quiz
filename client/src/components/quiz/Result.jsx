import React from "react";
import { Link } from "react-router-dom";

const Result = ({ correctAnswers, length, restartQuiz, quizId }) => {
  return (
    <div className="flex flex-col items-center py-6 px-8 rounded-2xl justify-center mt-20 bg-white shadow-lg w-full sm:w-[400px] text-center">
      <h2 className="text-2xl font-semibold text-gray-800">Quiz Completed!</h2>
      <p className="text-lg text-gray-600 mt-4">
        You answered <span className="text-green-500 font-bold">{correctAnswers}</span> out of{" "}
        <span className="text-blue-500 font-bold">{length}</span> correctly.
      </p>

      <div className="mt-6 flex flex-col gap-3 w-full">
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
        <Link to={`/leaderboard/${quizId}`} className="w-full">
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg w-full transition-all cursor-pointer">
            🏆 See leaderboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
