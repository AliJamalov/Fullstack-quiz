import React from "react";

const QuizDescription = ({ isQuizStarted, quizTitle, quizDescription, startQuiz, fetchQuizesQuestions }) => {
  return (
    <div className="text-white">
      {!isQuizStarted && (
        <div className="flex flex-col items-center mt-[100px]">
          <h1 className="font-semibold text-lg mb-2 sm:text-2xl">{quizTitle}</h1>
          <p className="font-medium text-md mb-2 sm:text-2xl">{quizDescription}</p>
          <p className="font-medium text-md mb-5 sm:text-2xl">Получите 3 звезды чтобы получить героя</p>
          <button
            onClick={() => {
              startQuiz();
              fetchQuizesQuestions();
            }}
            className="text-white bg-gray-900 py-3 px-5 cursor-pointer rounded"
          >
            Начать викторину
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizDescription;
