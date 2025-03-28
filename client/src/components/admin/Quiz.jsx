import React from "react";
import { FaTrash } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";

const Quiz = ({
  title,
  description,
  image,
  toggleQuestionModal,
  toggleQuizQuestions,
  id,
  setQuizId,
  handleDeleteQuiz,
  deletLoading,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg h-[490px] p-3 shadow-lg max-w-xs mx-auto">
      <div className="flex justify-end">
        {deletLoading ? (
          <PiSpinner size={20} className="animate-spin" />
        ) : (
          <FaTrash onClick={() => handleDeleteQuiz(id)} className="mb-2 cursor-pointer" size={20} color="red" />
        )}{" "}
      </div>

      <img src={image} alt={title} className="w-full h-[150px] object-cover" />
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={() => {
            toggleQuizQuestions();
            setQuizId(id);
          }}
          className="bg-black text-white rounded p-2 cursor-pointer"
        >
          See questions
        </button>
        <button
          onClick={() => {
            toggleQuestionModal();
            setQuizId(id);
          }}
          className="bg-green-500 bottom-3 right-4 text-white rounded p-2 cursor-pointer"
        >
          Add questions
        </button>
      </div>
    </div>
  );
};

export default Quiz;
